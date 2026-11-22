(function(global){
  "use strict";

  var manifestPromise = null;
  var manifest = null;
  var byKey = Object.create(null);
  var gltfLoader = null;
  var dracoLoader = null;
  var cache = new Map();
  var pending = new Map();
  var MAX_CACHE = 32;
  var scriptUrl = document.currentScript && document.currentScript.src;
  var ASSET_BASE_URL = scriptUrl ? new URL(".", scriptUrl) : new URL(".", document.baseURI);

  function keyOf(category, id){ return String(category) + ":" + String(id); }
  function vec3(THREE, value, fallback){
    var v = Array.isArray(value) && value.length === 3 ? value : fallback;
    return new THREE.Vector3(Number(v[0]) || 0, Number(v[1]) || 0, Number(v[2]) || 0);
  }

  function init(url){
    if(manifestPromise) return manifestPromise;
    var manifestUrl = new URL(url || "component-assets.json", ASSET_BASE_URL).toString();
    manifestPromise = fetch(manifestUrl, { credentials: "same-origin", cache: "no-cache" })
      .then(function(response){
        if(!response.ok) throw new Error("Registry aset tidak dapat dimuat (" + response.status + ")");
        return response.json();
      })
      .then(function(data){
        if(!data || !Array.isArray(data.items)) throw new Error("Format registry aset tidak sah.");
        manifest = data;
        data.items.forEach(function(item){
          if(item && item.id != null && item.category) byKey[keyOf(item.category, item.id)] = item;
        });
        return {
          count: data.items.length,
          categories: Object.keys(data.categories || {}).length,
          baseProductCount: Number(data.baseProductCount) || 0,
          syntheticVisualVariantCount: Number(data.syntheticVisualVariantCount) || 0,
          registeredModels: data.items.filter(function(item){ return !!item.modelUrl; }).length
        };
      })
      .catch(function(error){
        manifestPromise = null;
        throw error;
      });
    return manifestPromise;
  }

  function ensureLoader(){
    if(gltfLoader) return gltfLoader;
    if(!global.THREE || !global.THREE.GLTFLoader) throw new Error("Three.js GLTFLoader belum tersedia.");
    gltfLoader = new global.THREE.GLTFLoader();
    if(global.THREE.DRACOLoader){
      try{
        dracoLoader = new global.THREE.DRACOLoader();
        dracoLoader.setDecoderPath(new URL("../draco/", ASSET_BASE_URL).toString());
        if(dracoLoader.setDecoderConfig) dracoLoader.setDecoderConfig({type:"wasm"});
        gltfLoader.setDRACOLoader(dracoLoader);
      }catch(error){
        dracoLoader = null;
      }
    }
    return gltfLoader;
  }

  function disposeMaterial(material){
    var list = Array.isArray(material) ? material : [material];
    list.forEach(function(m){
      if(!m) return;
      Object.keys(m).forEach(function(k){
        var value = m[k];
        if(value && value.isTexture && typeof value.dispose === "function") value.dispose();
      });
      if(typeof m.dispose === "function") m.dispose();
    });
  }

  function disposeScene(scene){
    if(!scene || !scene.traverse) return;
    scene.traverse(function(object){
      if(object.geometry && object.geometry.dispose) object.geometry.dispose();
      if(object.material) disposeMaterial(object.material);
    });
  }

  function evictCache(){
    if(cache.size <= MAX_CACHE) return;
    var candidates = Array.from(cache.entries())
      .filter(function(entry){ return entry[1].refs === 0; })
      .sort(function(a,b){ return a[1].lastUsed - b[1].lastUsed; });
    while(cache.size > MAX_CACHE && candidates.length){
      var entry = candidates.shift();
      cache.delete(entry[0]);
      disposeScene(entry[1].scene);
    }
  }

  function loadGLTF(url){
    var existing = cache.get(url);
    if(existing){
      existing.lastUsed = Date.now();
      return Promise.resolve(existing);
    }
    if(pending.has(url)) return pending.get(url);
    var task = Promise.resolve().then(function(){
      return ensureLoader().loadAsync(url);
    }).then(function(gltf){
      if(!gltf || !gltf.scene) throw new Error("Fail GLB tidak mempunyai scene utama.");
      var item = { scene:gltf.scene, refs:0, lastUsed:Date.now() };
      cache.set(url, item);
      pending.delete(url);
      evictCache();
      return item;
    }).catch(function(error){
      pending.delete(url);
      throw error;
    });
    pending.set(url, task);
    return task;
  }

  function hasNestedAsset(branch){
    var found = !!(branch.userData && (branch.userData.ikrAssetRef || branch.userData.ikrAssetCacheUrl));
    if(found) return true;
    branch.traverse(function(object){
      if(object.userData && (object.userData.ikrAssetRef || object.userData.ikrAssetCacheUrl)) found = true;
    });
    return found;
  }

  function proceduralBoundsInLocal(THREE, root){
    root.updateMatrixWorld(true);
    var inverse = root.matrixWorld.clone().invert();
    var bounds = new THREE.Box3();
    var found = false;
    root.traverse(function(object){
      if(!object.isMesh || !object.geometry) return;
      var ancestor = object.parent;
      while(ancestor && ancestor !== root){
        if(ancestor.userData && (ancestor.userData.ikrAssetRef || ancestor.userData.ikrAssetCacheUrl)){
          return;
        }
        ancestor = ancestor.parent;
      }
      var geometry = object.geometry;
      if(!geometry.boundingBox && geometry.computeBoundingBox) geometry.computeBoundingBox();
      if(!geometry.boundingBox) return;
      var matrix = inverse.clone().multiply(object.matrixWorld);
      bounds.union(geometry.boundingBox.clone().applyMatrix4(matrix));
      found = true;
    });
    return found ? bounds : null;
  }

  function fitModelToBounds(THREE, model, targetBounds, transform){
    var rotation = Array.isArray(transform.rotationDeg) ? transform.rotationDeg : [0,0,0];
    model.rotation.x += (Number(rotation[0]) || 0) * Math.PI / 180;
    model.rotation.y += (Number(rotation[1]) || 0) * Math.PI / 180;
    model.rotation.z += (Number(rotation[2]) || 0) * Math.PI / 180;

    var manualScale = vec3(THREE, transform.scale, [1,1,1]);
    model.scale.multiply(manualScale);
    model.updateMatrixWorld(true);

    var sourceBounds = new THREE.Box3().setFromObject(model);
    var sourceSize = sourceBounds.getSize(new THREE.Vector3());
    var targetSize = targetBounds.getSize(new THREE.Vector3());
    var ratios = [
      sourceSize.x > 0.0001 ? targetSize.x / sourceSize.x : 1,
      sourceSize.y > 0.0001 ? targetSize.y / sourceSize.y : 1,
      sourceSize.z > 0.0001 ? targetSize.z / sourceSize.z : 1
    ];

    if(transform.fit === "fill"){
      model.scale.multiply(new THREE.Vector3(ratios[0], ratios[1], ratios[2]));
    }else if(transform.fit === "none"){
      // Gunakan skala manual yang ditetapkan di registry.
    }else{
      var uniform = Math.min(ratios[0], ratios[1], ratios[2]);
      model.scale.multiplyScalar(Number.isFinite(uniform) && uniform > 0 ? uniform : 1);
    }

    model.updateMatrixWorld(true);
    sourceBounds.setFromObject(model);
    var targetCenter = targetBounds.getCenter(new THREE.Vector3());
    var sourceCenter = sourceBounds.getCenter(new THREE.Vector3());
    model.position.add(targetCenter.sub(sourceCenter));
    model.position.add(vec3(THREE, transform.position, [0,0,0]));
  }

  function replaceWithGLB(target, isCurrent){
    var ref = target && target.userData && target.userData.ikrAssetRef;
    if(!ref || target.userData.ikrAssetOverride) return Promise.resolve(null);
    return init().then(function(){
      var item = byKey[keyOf(ref.category, ref.id)];
      if(!item || !item.modelUrl) return null;
      var url = new URL(item.modelUrl, ASSET_BASE_URL).toString();
      return loadGLTF(url).then(function(cached){
        if((isCurrent && !isCurrent()) || !target.parent || target.userData.ikrAssetOverride) return null;
        var THREE = global.THREE;
        var model = cached.scene.clone(true);
        var transform = item.transform || {};
        var bounds = proceduralBoundsInLocal(THREE, target);
        if(bounds && !bounds.isEmpty()) fitModelToBounds(THREE, model, bounds, transform);
        else {
          var rotation = transform.rotationDeg || [0,0,0];
          model.rotation.set(
            (Number(rotation[0]) || 0) * Math.PI / 180,
            (Number(rotation[1]) || 0) * Math.PI / 180,
            (Number(rotation[2]) || 0) * Math.PI / 180
          );
          model.scale.multiply(vec3(THREE, transform.scale, [1,1,1]));
          model.position.add(vec3(THREE, transform.position, [0,0,0]));
        }

        model.userData = model.userData || {};
        model.userData.ikrAssetCacheUrl = url;
        model.userData.ikrAssetModel = true;
        model.traverse(function(object){
          if(object.isMesh){ object.castShadow = true; object.receiveShadow = true; }
        });

        // Simpan subkomponen terpilih (CPU/RAM/GPU/SSD) apabila motherboard diganti GLB.
        var remove = [];
        target.children.slice().forEach(function(child){
          var isGlassPanel = !!(target.userData && target.userData.glass === child);
          if(!isGlassPanel && !hasNestedAsset(child) && !(child.userData && child.userData.ikrAssetCacheUrl)) remove.push(child);
        });
        remove.forEach(function(child){
          target.remove(child);
          disposeScene(child);
        });
        target.add(model);
        target.userData.ikrAssetOverride = true;
        cached.refs += 1;
        cached.lastUsed = Date.now();
        evictCache();
        return model;
      });
    });
  }

  function releaseTree(root){
    if(!root || !root.traverse) return;
    root.traverse(function(object){
      var url = object.userData && object.userData.ikrAssetCacheUrl;
      if(!url) return;
      var cached = cache.get(url);
      if(cached) cached.refs = Math.max(0, cached.refs - 1);
      object.userData.ikrAssetCacheUrl = null;
    });
    evictCache();
  }

  function assetFor(category, id){
    return byKey[keyOf(category, id)] || null;
  }

  function stats(){
    return {
      registryComponents: manifest ? manifest.items.length : 0,
      registeredGLBModels: manifest ? manifest.items.filter(function(item){return !!item.modelUrl;}).length : 0,
      cachedGLBModels: cache.size,
      pendingLoads: pending.size
    };
  }

  global.IKRComponentAssetLoader = {
    init:init,
    replaceWithGLB:replaceWithGLB,
    releaseTree:releaseTree,
    assetFor:assetFor,
    stats:stats
  };
})(window);