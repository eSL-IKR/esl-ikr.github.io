// QUIZ_IKR3163 — 20 soalan objektif setiap KP (7 mudah, 7 sederhana, 6 KBAT). answer = indeks pilihan betul (0–3)
export const QUIZ_IKR3163 = [
 {
  "kp": 1,
  "title": "Pengalamatan IPv4 & Subnetting",
  "questions": [
   {
    "id": "kp1-1",
    "level": "mudah",
    "q": "Alamat IPv4 mempunyai panjang…",
    "options": [
     "16 bit",
     "32 bit",
     "64 bit",
     "128 bit"
    ],
    "answer": 1
   },
   {
    "id": "kp1-2",
    "level": "mudah",
    "q": "Satu oktet ialah…",
    "options": [
     "4 bit",
     "16 bit",
     "8 bit",
     "32 bit"
    ],
    "answer": 2
   },
   {
    "id": "kp1-3",
    "level": "mudah",
    "q": "Unicast ialah penghantaran…",
    "options": [
     "Satu ke semua",
     "Satu ke kumpulan",
     "Semua ke semua",
     "Satu ke satu"
    ],
    "answer": 3
   },
   {
    "id": "kp1-4",
    "level": "mudah",
    "q": "Broadcast ialah penghantaran kepada…",
    "options": [
     "Semua peranti dalam rangkaian setempat",
     "Satu peranti",
     "Kumpulan terpilih",
     "Pelayan Internet sahaja"
    ],
    "answer": 0
   },
   {
    "id": "kp1-5",
    "level": "mudah",
    "q": "Julat multicast IPv4 ialah…",
    "options": [
     "10.0.0.0 – 10.255.255.255",
     "224.0.0.0 – 239.255.255.255",
     "192.168.0.0 – 192.168.255.255",
     "127.0.0.0 – 127.255.255.255"
    ],
    "answer": 1
   },
   {
    "id": "kp1-6",
    "level": "mudah",
    "q": "Antara berikut, julat alamat peribadi ialah…",
    "options": [
     "8.8.8.0/24",
     "224.0.0.0/4",
     "192.168.0.0/16",
     "169.254.0.0/16"
    ],
    "answer": 2
   },
   {
    "id": "kp1-7",
    "level": "mudah",
    "q": "Alamat loopback ialah…",
    "options": [
     "192.168.1.1",
     "10.0.0.1",
     "255.255.255.255",
     "127.0.0.1"
    ],
    "answer": 3
   },
   {
    "id": "kp1-8",
    "level": "sederhana",
    "q": "Alamat APIPA berada dalam julat…",
    "options": [
     "169.254.x.x",
     "192.168.x.x",
     "10.x.x.x",
     "172.16.x.x"
    ],
    "answer": 0
   },
   {
    "id": "kp1-9",
    "level": "sederhana",
    "q": "Kelas C bermula dengan oktet pertama…",
    "options": [
     "1 – 126",
     "192 – 223",
     "128 – 191",
     "224 – 239"
    ],
    "answer": 1
   },
   {
    "id": "kp1-10",
    "level": "sederhana",
    "q": "Bilangan hos boleh guna dalam /26 ialah…",
    "options": [
     "64",
     "30",
     "62",
     "126"
    ],
    "answer": 2
   },
   {
    "id": "kp1-11",
    "level": "sederhana",
    "q": "Subnet mask bagi /27 ialah…",
    "options": [
     "255.255.255.192",
     "255.255.255.240",
     "255.255.255.128",
     "255.255.255.224"
    ],
    "answer": 3
   },
   {
    "id": "kp1-12",
    "level": "sederhana",
    "q": "NAT berfungsi untuk…",
    "options": [
     "Menterjemah alamat peribadi kepada alamat awam",
     "Menyulitkan data",
     "Menambah bandwidth",
     "Membahagi VLAN"
    ],
    "answer": 0
   },
   {
    "id": "kp1-13",
    "level": "sederhana",
    "q": "Segmentasi rangkaian mengurangkan…",
    "options": [
     "Bilangan kabel",
     "Broadcast domain",
     "Saiz monitor",
     "Kelajuan"
    ],
    "answer": 1
   },
   {
    "id": "kp1-14",
    "level": "sederhana",
    "q": "Alamat broadcast bagi 192.168.1.0/24 ialah…",
    "options": [
     "192.168.1.0",
     "192.168.1.1",
     "192.168.1.255",
     "192.168.0.255"
    ],
    "answer": 2
   },
   {
    "id": "kp1-15",
    "level": "KBAT",
    "q": "PC mendapat alamat 169.254.10.5. Kemungkinan punca?",
    "options": [
     "Alamat ditetapkan oleh ISP",
     "Alamat awam sah",
     "PC berada dalam VLAN pengurusan",
     "DHCP tidak dapat dihubungi"
    ],
    "answer": 3
   },
   {
    "id": "kp1-16",
    "level": "KBAT",
    "q": "Untuk membahagi 192.168.1.0/24 kepada 4 subnet sama saiz, prefix baharu?",
    "options": [
     "/26",
     "/25",
     "/27",
     "/28"
    ],
    "answer": 0
   },
   {
    "id": "kp1-17",
    "level": "KBAT",
    "q": "Julat hos bagi 192.168.1.64/26 ialah…",
    "options": [
     "192.168.1.64 – 192.168.1.127",
     "192.168.1.65 – 192.168.1.126",
     "192.168.1.1 – 192.168.1.62",
     "192.168.1.66 – 192.168.1.130"
    ],
    "answer": 1
   },
   {
    "id": "kp1-18",
    "level": "KBAT",
    "q": "Perlu sekurang-kurangnya 30 hos dalam satu subnet. Prefix paling sesuai?",
    "options": [
     "/26",
     "/28",
     "/27",
     "/29"
    ],
    "answer": 2
   },
   {
    "id": "kp1-19",
    "level": "KBAT",
    "q": "Alamat 172.20.5.1 ialah alamat…",
    "options": [
     "Awam",
     "Multicast",
     "Loopback",
     "Peribadi"
    ],
    "answer": 3
   },
   {
    "id": "kp1-20",
    "level": "KBAT",
    "q": "Rangkaian dalaman menggunakan 10.x.x.x dan perlu akses Internet. Apa yang diperlukan?",
    "options": [
     "NAT",
     "Multicast",
     "Loopback",
     "APIPA"
    ],
    "answer": 0
   }
  ]
 },
 {
  "kp": 2,
  "title": "Variable Length Subnet Mask (VLSM)",
  "questions": [
   {
    "id": "kp2-1",
    "level": "mudah",
    "q": "VLSM bermaksud…",
    "options": [
     "Virtual LAN Subnet Method",
     "Very Large Subnet Model",
     "Variable Length Subnet Mask",
     "Variable Link State Mask"
    ],
    "answer": 2
   },
   {
    "id": "kp2-2",
    "level": "mudah",
    "q": "Tujuan utama VLSM ialah…",
    "options": [
     "Menambah kabel",
     "Menyulitkan data",
     "Menambah SSID",
     "Menjimatkan alamat IP"
    ],
    "answer": 3
   },
   {
    "id": "kp2-3",
    "level": "mudah",
    "q": "Pautan WAN antara dua router biasanya menggunakan…",
    "options": [
     "/30",
     "/24",
     "/16",
     "/8"
    ],
    "answer": 0
   },
   {
    "id": "kp2-4",
    "level": "mudah",
    "q": "Bilangan hos boleh guna dalam /30 ialah…",
    "options": [
     "4",
     "2",
     "6",
     "14"
    ],
    "answer": 1
   },
   {
    "id": "kp2-5",
    "level": "mudah",
    "q": "Dalam VLSM, subnet disusun bermula daripada…",
    "options": [
     "Keperluan hos paling sedikit",
     "Susunan rawak",
     "Keperluan hos terbanyak",
     "Nama jabatan"
    ],
    "answer": 2
   },
   {
    "id": "kp2-6",
    "level": "mudah",
    "q": "Bilangan hos boleh guna dalam /25 ialah…",
    "options": [
     "128",
     "62",
     "254",
     "126"
    ],
    "answer": 3
   },
   {
    "id": "kp2-7",
    "level": "mudah",
    "q": "Bilangan hos boleh guna dalam /28 ialah…",
    "options": [
     "14",
     "16",
     "30",
     "6"
    ],
    "answer": 0
   },
   {
    "id": "kp2-8",
    "level": "sederhana",
    "q": "Rangkaian memerlukan 50 hos. Prefix VLSM yang sesuai?",
    "options": [
     "/27",
     "/26",
     "/25",
     "/28"
    ],
    "answer": 1
   },
   {
    "id": "kp2-9",
    "level": "sederhana",
    "q": "Rangkaian memerlukan 100 hos. Prefix VLSM yang sesuai?",
    "options": [
     "/26",
     "/24 sahaja",
     "/25",
     "/27"
    ],
    "answer": 2
   },
   {
    "id": "kp2-10",
    "level": "sederhana",
    "q": "Rangkaian memerlukan 20 hos. Prefix VLSM yang sesuai?",
    "options": [
     "/28",
     "/26",
     "/29",
     "/27"
    ],
    "answer": 3
   },
   {
    "id": "kp2-11",
    "level": "sederhana",
    "q": "Pemuliharaan alamat IPv4 dibantu oleh…",
    "options": [
     "VLSM",
     "Broadcast",
     "Loopback",
     "Multicast"
    ],
    "answer": 0
   },
   {
    "id": "kp2-12",
    "level": "sederhana",
    "q": "Selepas 192.168.1.0/25, subnet seterusnya bermula pada…",
    "options": [
     "192.168.1.127",
     "192.168.1.128",
     "192.168.1.100",
     "192.168.2.0"
    ],
    "answer": 1
   },
   {
    "id": "kp2-13",
    "level": "sederhana",
    "q": "Subnet yang bertindih…",
    "options": [
     "Digalakkan",
     "Tidak mengapa",
     "Mesti dielakkan",
     "Mengurangkan broadcast"
    ],
    "answer": 2
   },
   {
    "id": "kp2-14",
    "level": "sederhana",
    "q": "Subnet mask bagi /26 ialah…",
    "options": [
     "255.255.255.224",
     "255.255.255.128",
     "255.255.255.240",
     "255.255.255.192"
    ],
    "answer": 3
   },
   {
    "id": "kp2-15",
    "level": "KBAT",
    "q": "Agihan 192.168.1.0/24: A=100, B=50, C=20, WAN=2 hos. Rangkaian WAN ialah…",
    "options": [
     "192.168.1.224/30",
     "192.168.1.200/30",
     "192.168.1.0/30",
     "192.168.1.128/30"
    ],
    "answer": 0
   },
   {
    "id": "kp2-16",
    "level": "KBAT",
    "q": "Dalam agihan itu, C (/27) bermula selepas B (192.168.1.128/26) pada…",
    "options": [
     "192.168.1.160",
     "192.168.1.192",
     "192.168.1.176",
     "192.168.1.200"
    ],
    "answer": 1
   },
   {
    "id": "kp2-17",
    "level": "KBAT",
    "q": "Mengapa FLSM (saiz subnet sama) membazir?",
    "options": [
     "Terlalu sedikit alamat dibazirkan",
     "Subnet terlalu kecil sentiasa",
     "Semua subnet sama saiz walaupun keperluan hos berbeza",
     "Tidak boleh digunakan dengan IPv4"
    ],
    "answer": 2
   },
   {
    "id": "kp2-18",
    "level": "KBAT",
    "q": "Bilangan alamat jumlah dalam /27 ialah…",
    "options": [
     "30",
     "16",
     "64",
     "32"
    ],
    "answer": 3
   },
   {
    "id": "kp2-19",
    "level": "KBAT",
    "q": "Alamat broadcast bagi 192.168.1.0/25 ialah…",
    "options": [
     "192.168.1.127",
     "192.168.1.128",
     "192.168.1.255",
     "192.168.1.126"
    ],
    "answer": 0
   },
   {
    "id": "kp2-20",
    "level": "KBAT",
    "q": "Rangkaian memerlukan 10 hos sahaja. Adakah /28 memadai?",
    "options": [
     "Tidak, memerlukan /24",
     "Ya, kerana /28 menyediakan 14 hos",
     "Tidak, memerlukan /30",
     "Ya, kerana /28 menyediakan 30 hos"
    ],
    "answer": 1
   }
  ]
 },
 {
  "kp": 3,
  "title": "IPv6 & Reka Bentuk Berstruktur",
  "questions": [
   {
    "id": "kp3-1",
    "level": "mudah",
    "q": "Alamat IPv6 mempunyai panjang…",
    "options": [
     "32 bit",
     "64 bit",
     "48 bit",
     "128 bit"
    ],
    "answer": 3
   },
   {
    "id": "kp3-2",
    "level": "mudah",
    "q": "Alamat IPv6 ditulis dalam format…",
    "options": [
     "Heksadesimal",
     "Binari sahaja",
     "Perpuluhan bertitik",
     "Oktal"
    ],
    "answer": 0
   },
   {
    "id": "kp3-3",
    "level": "mudah",
    "q": "Simbol :: dalam IPv6 boleh digunakan…",
    "options": [
     "Berkali-kali",
     "Sekali sahaja dalam satu alamat",
     "Tidak boleh langsung",
     "Hanya di hujung"
    ],
    "answer": 1
   },
   {
    "id": "kp3-4",
    "level": "mudah",
    "q": "Prefix biasa untuk satu subnet LAN IPv6 ialah…",
    "options": [
     "/8",
     "/128 sahaja",
     "/64",
     "/32 sahaja"
    ],
    "answer": 2
   },
   {
    "id": "kp3-5",
    "level": "mudah",
    "q": "Alamat link-local IPv6 bermula dengan…",
    "options": [
     "2000::/3",
     "FF00::/8",
     "FC00::/7",
     "FE80::/10"
    ],
    "answer": 3
   },
   {
    "id": "kp3-6",
    "level": "mudah",
    "q": "Alamat multicast IPv6 bermula dengan…",
    "options": [
     "FF00::/8",
     "FE80::/10",
     "2000::/3",
     "FC00::/7"
    ],
    "answer": 0
   },
   {
    "id": "kp3-7",
    "level": "mudah",
    "q": "Punca utama keperluan IPv6 ialah…",
    "options": [
     "Warna kabel",
     "Kehabisan alamat IPv4",
     "Kos router",
     "Kelajuan Wi-Fi"
    ],
    "answer": 1
   },
   {
    "id": "kp3-8",
    "level": "sederhana",
    "q": "Dual-stack bermaksud…",
    "options": [
     "Dua kabel sahaja",
     "Dua firewall",
     "IPv4 dan IPv6 berjalan serentak",
     "Dua VLAN"
    ],
    "answer": 2
   },
   {
    "id": "kp3-9",
    "level": "sederhana",
    "q": "Tunneling dalam peralihan IPv6 ialah…",
    "options": [
     "Memadam IPv4",
     "Menyulitkan IPv6",
     "Menukar kabel",
     "Membungkus paket IPv6 dalam IPv4"
    ],
    "answer": 3
   },
   {
    "id": "kp3-10",
    "level": "sederhana",
    "q": "NAT64/DNS64 berfungsi…",
    "options": [
     "Menterjemah antara IPv6 dan IPv4",
     "Menyulitkan DNS",
     "Menambah port",
     "Memadam DNS"
    ],
    "answer": 0
   },
   {
    "id": "kp3-11",
    "level": "sederhana",
    "q": "Bentuk ringkas 2001:0db8:0000:0000:0000:0000:0000:0001 ialah…",
    "options": [
     "2001:db8:1",
     "2001:db8::1",
     "2001::db8::1",
     "2001:db8:0:1"
    ],
    "answer": 1
   },
   {
    "id": "kp3-12",
    "level": "sederhana",
    "q": "Global unicast IPv6 berada dalam julat…",
    "options": [
     "FE80::/10",
     "FF00::/8",
     "2000::/3",
     "::1/128"
    ],
    "answer": 2
   },
   {
    "id": "kp3-13",
    "level": "sederhana",
    "q": "Unique local IPv6 berada dalam julat…",
    "options": [
     "2000::/3",
     "FE80::/10",
     "FF00::/8",
     "FC00::/7"
    ],
    "answer": 3
   },
   {
    "id": "kp3-14",
    "level": "sederhana",
    "q": "Reka bentuk alamat berstruktur bermanfaat kerana…",
    "options": [
     "Penetapan alamat peranti konsisten dan mudah diurus",
     "Alamat ditetapkan rawak",
     "Tiada dokumentasi diperlukan",
     "Menambah broadcast"
    ],
    "answer": 0
   },
   {
    "id": "kp3-15",
    "level": "KBAT",
    "q": "Bentuk ringkas yang betul bagi 2001:db8:0:0:1:0:0:5 ialah…",
    "options": [
     "2001:db8::1::5",
     "2001:db8::1:0:0:5",
     "2001::db8::1:5",
     "2001:db8:1::5"
    ],
    "answer": 1
   },
   {
    "id": "kp3-16",
    "level": "KBAT",
    "q": "Mengapa :: tidak boleh digunakan dua kali?",
    "options": [
     "Terlalu panjang",
     "Kerana IPv6 tidak guna sifar",
     "Tidak dapat menentukan bilangan kumpulan sifar bagi setiap ::",
     "Ia hanya untuk IPv4"
    ],
    "answer": 2
   },
   {
    "id": "kp3-17",
    "level": "KBAT",
    "q": "Bilangan peranti IoT meningkat dan IPv4 tidak mencukupi. Penyelesaian jangka panjang?",
    "options": [
     "Tambah lebih banyak NAT sahaja",
     "Kurangkan peranti",
     "Guna APIPA",
     "IPv6"
    ],
    "answer": 3
   },
   {
    "id": "kp3-18",
    "level": "KBAT",
    "q": "Peranti IPv6 sahaja perlu mencapai pelayan IPv4. Mekanisme sesuai?",
    "options": [
     "NAT64/DNS64",
     "Loopback",
     "APIPA",
     "Broadcast"
    ],
    "answer": 0
   },
   {
    "id": "kp3-19",
    "level": "KBAT",
    "q": "Prefix /64 pada satu LAN IPv6 bertujuan…",
    "options": [
     "Menghadkan kepada 2 hos",
     "Memberi ruang subnet host yang besar bagi satu segmen",
     "Menyekat IPv6",
     "Menukar kepada IPv4"
    ],
    "answer": 1
   },
   {
    "id": "kp3-20",
    "level": "KBAT",
    "q": "Kelebihan utama IPv6 berbanding IPv4 ialah…",
    "options": [
     "Alamat lebih pendek",
     "Tidak perlu router",
     "Ruang alamat yang sangat besar",
     "Tidak boleh disubnet"
    ],
    "answer": 2
   }
  ]
 },
 {
  "kp": 4,
  "title": "Ancaman Siber & Akses Tanpa Kebenaran",
  "questions": [
   {
    "id": "kp4-1",
    "level": "mudah",
    "q": "Malware ialah…",
    "options": [
     "Perisian berniat jahat",
     "Perisian pejabat",
     "Alat sandaran",
     "Pemacu peranti"
    ],
    "answer": 0
   },
   {
    "id": "kp4-2",
    "level": "mudah",
    "q": "Phishing ialah…",
    "options": [
     "Pemasangan kabel",
     "Penipuan untuk mencuri maklumat dengan menyamar",
     "Serangan fizikal",
     "Sandaran awan"
    ],
    "answer": 1
   },
   {
    "id": "kp4-3",
    "level": "mudah",
    "q": "DoS bertujuan…",
    "options": [
     "Mencuri kata laluan sahaja",
     "Menambah bandwidth",
     "Menghalang akses kepada perkhidmatan",
     "Menyulitkan fail"
    ],
    "answer": 2
   },
   {
    "id": "kp4-4",
    "level": "mudah",
    "q": "DDoS dilakukan daripada…",
    "options": [
     "Satu komputer sahaja",
     "Kabel rosak",
     "Pengguna sah sahaja",
     "Banyak sumber serentak"
    ],
    "answer": 3
   },
   {
    "id": "kp4-5",
    "level": "mudah",
    "q": "Man-in-the-Middle (MitM) ialah…",
    "options": [
     "Penyerang menyusup antara dua pihak yang berkomunikasi",
     "Serangan fizikal pada server",
     "Kerosakan kabel",
     "Kehabisan memori"
    ],
    "answer": 0
   },
   {
    "id": "kp4-6",
    "level": "mudah",
    "q": "Botnet ialah…",
    "options": [
     "Rangkaian rasmi syarikat",
     "Rangkaian komputer dijangkiti yang dikawal penyerang",
     "Jenis firewall",
     "Pelayan sandaran"
    ],
    "answer": 1
   },
   {
    "id": "kp4-7",
    "level": "mudah",
    "q": "Data breach ialah…",
    "options": [
     "Sandaran data",
     "Kemas kini perisian",
     "Pendedahan data sensitif kepada pihak tidak sah",
     "Pemasangan OS"
    ],
    "answer": 2
   },
   {
    "id": "kp4-8",
    "level": "sederhana",
    "q": "Social engineering ialah…",
    "options": [
     "Pemasangan perisian",
     "Konfigurasi router",
     "Pembaikan kabel",
     "Manipulasi psikologi untuk menipu mangsa"
    ],
    "answer": 3
   },
   {
    "id": "kp4-9",
    "level": "sederhana",
    "q": "Insider threat ialah ancaman daripada…",
    "options": [
     "Pekerja dalaman yang berniat jahat atau cuai",
     "Penggodam asing sahaja",
     "Virus sahaja",
     "Kabel"
    ],
    "answer": 0
   },
   {
    "id": "kp4-10",
    "level": "sederhana",
    "q": "Cara terbaik mencegah phishing ialah…",
    "options": [
     "Klik semua pautan",
     "Latihan kesedaran dan tidak klik pautan mencurigakan",
     "Kongsi kata laluan",
     "Matikan antivirus"
    ],
    "answer": 1
   },
   {
    "id": "kp4-11",
    "level": "sederhana",
    "q": "2FA memberi…",
    "options": [
     "Penggantian kata laluan",
     "Kelajuan lebih tinggi",
     "Lapisan keselamatan tambahan pada log masuk",
     "Penyulitan cakera"
    ],
    "answer": 2
   },
   {
    "id": "kp4-12",
    "level": "sederhana",
    "q": "Pretexting ialah…",
    "options": [
     "Memasang firewall",
     "Mengemas kini OS",
     "Menyalin fail",
     "Mencipta alasan palsu untuk mendapatkan maklumat"
    ],
    "answer": 3
   },
   {
    "id": "kp4-13",
    "level": "sederhana",
    "q": "Akses tanpa kebenaran (unauthorized access) bermaksud…",
    "options": [
     "Mengakses sistem atau data tanpa kebenaran sah",
     "Akses oleh pentadbir yang diberi kuasa",
     "Akses oleh pengguna sah",
     "Akses melalui SSH sahaja"
    ],
    "answer": 0
   },
   {
    "id": "kp4-14",
    "level": "sederhana",
    "q": "Penyulitan melindungi data…",
    "options": [
     "Hanya semasa dicetak",
     "Semasa disimpan dan dihantar",
     "Hanya di kertas",
     "Hanya semasa dipadam"
    ],
    "answer": 1
   },
   {
    "id": "kp4-15",
    "level": "KBAT",
    "q": "E-mel dari ‘bank’ palsu meminta anda log masuk melalui pautan. Jenis serangan?",
    "options": [
     "DDoS",
     "MitM",
     "Phishing",
     "Brute-force kabel"
    ],
    "answer": 2
   },
   {
    "id": "kp4-16",
    "level": "KBAT",
    "q": "Laman web jatuh selepas dibanjiri jutaan permintaan daripada botnet. Jenis serangan?",
    "options": [
     "Phishing",
     "Malware USB",
     "Pretexting",
     "DDoS"
    ],
    "answer": 3
   },
   {
    "id": "kp4-17",
    "level": "KBAT",
    "q": "Penyerang membaca trafik anda di Wi-Fi awam tanpa penyulitan. Serangan?",
    "options": [
     "Man-in-the-Middle",
     "DDoS",
     "Ransomware sahaja",
     "Pretexting"
    ],
    "answer": 0
   },
   {
    "id": "kp4-18",
    "level": "KBAT",
    "q": "Laptop yang hilang mengandungi data pelanggan menyebabkan…",
    "options": [
     "Peningkatan prestasi",
     "Kebocoran data akibat kecuaian",
     "Sandaran automatik",
     "Kemas kini OS"
    ],
    "answer": 1
   },
   {
    "id": "kp4-19",
    "level": "KBAT",
    "q": "Langkah paling berkesan mengurangkan insider threat ialah…",
    "options": [
     "Beri semua akses admin",
     "Padam log",
     "Akses terhad dan audit aktiviti",
     "Elak latihan"
    ],
    "answer": 2
   },
   {
    "id": "kp4-20",
    "level": "KBAT",
    "q": "Storan awan tanpa kawalan keselamatan berisiko…",
    "options": [
     "Kelajuan meningkat",
     "Kos berkurang sahaja",
     "Penyulitan automatik penuh",
     "Kebocoran data"
    ],
    "answer": 3
   }
  ]
 },
 {
  "kp": 5,
  "title": "Pengukuhan Keselamatan Peranti Penghujung (End Node) & Kemas Kini OS",
  "questions": [
   {
    "id": "kp5-1",
    "level": "mudah",
    "q": "End node ialah…",
    "options": [
     "Hanya router",
     "Peranti pengguna seperti komputer, laptop dan telefon",
     "Hanya kabel",
     "Hanya switch"
    ],
    "answer": 1
   },
   {
    "id": "kp5-2",
    "level": "mudah",
    "q": "Fungsi antivirus ialah…",
    "options": [
     "Menambah RAM",
     "Menyejukkan CPU",
     "Mengesan dan membuang malware",
     "Menukar IP"
    ],
    "answer": 2
   },
   {
    "id": "kp5-3",
    "level": "mudah",
    "q": "Firewall peribadi pada end node berfungsi…",
    "options": [
     "Menyulitkan e-mel sahaja",
     "Menyimpan sandaran",
     "Mengurus VLAN",
     "Menapis trafik masuk dan keluar"
    ],
    "answer": 3
   },
   {
    "id": "kp5-4",
    "level": "mudah",
    "q": "Sandaran (backup) ialah…",
    "options": [
     "Salinan data untuk dipulihkan kemudian",
     "Memadam data",
     "Menyulitkan kata laluan",
     "Memasang OS"
    ],
    "answer": 0
   },
   {
    "id": "kp5-5",
    "level": "mudah",
    "q": "Kemas kini OS bertujuan…",
    "options": [
     "Menukar wallpaper",
     "Menutup kelemahan keselamatan",
     "Menambah kabel",
     "Menukar jenama"
    ],
    "answer": 1
   },
   {
    "id": "kp5-6",
    "level": "mudah",
    "q": "Penyulitan cakera berguna apabila…",
    "options": [
     "Skrin retak",
     "Bateri habis",
     "Peranti hilang atau dicuri",
     "Internet perlahan"
    ],
    "answer": 2
   },
   {
    "id": "kp5-7",
    "level": "mudah",
    "q": "Kata laluan yang kukuh ialah…",
    "options": [
     "Nama sendiri",
     "Sama untuk semua akaun",
     "1234",
     "Panjang, kompleks dan unik"
    ],
    "answer": 3
   },
   {
    "id": "kp5-8",
    "level": "sederhana",
    "q": "Prinsip kawalan akses pengguna yang baik ialah…",
    "options": [
     "Hak akses minimum",
     "Semua pengguna admin",
     "Tiada kata laluan",
     "Kongsi akaun"
    ],
    "answer": 0
   },
   {
    "id": "kp5-9",
    "level": "sederhana",
    "q": "Audit log berguna untuk…",
    "options": [
     "Menyejukkan peranti",
     "Merekod dan menyemak aktiviti pengguna",
     "Menambah storan",
     "Mencetak dokumen"
    ],
    "answer": 1
   },
   {
    "id": "kp5-10",
    "level": "sederhana",
    "q": "Sandaran penuh ialah…",
    "options": [
     "Hanya perubahan terkini",
     "Padam semua data",
     "Salinan semua data yang dipilih",
     "Salinan kata laluan sahaja"
    ],
    "answer": 2
   },
   {
    "id": "kp5-11",
    "level": "sederhana",
    "q": "Amalan baik sandaran termasuk…",
    "options": [
     "Simpan di peranti yang sama sahaja",
     "Tidak menguji pemulihan",
     "Padam selepas seminggu",
     "Simpan salinan di lokasi berasingan dan uji pemulihan"
    ],
    "answer": 3
   },
   {
    "id": "kp5-12",
    "level": "sederhana",
    "q": "Kemas kini keselamatan OS biasanya…",
    "options": [
     "Membetulkan kerentanan yang dikesan",
     "Menambah iklan",
     "Mengurangkan keselamatan",
     "Memadam pengguna"
    ],
    "answer": 0
   },
   {
    "id": "kp5-13",
    "level": "sederhana",
    "q": "Pemantauan end node membantu…",
    "options": [
     "Menambah virus",
     "Mengesan aktiviti luar biasa",
     "Menjadikan peranti lambat",
     "Menutup rangkaian"
    ],
    "answer": 1
   },
   {
    "id": "kp5-14",
    "level": "sederhana",
    "q": "Antara jenis kemas kini OS ialah…",
    "options": [
     "Kemas kini warna kabel",
     "Kemas kini monitor",
     "Patch keselamatan dan upgrade versi",
     "Kemas kini meja"
    ],
    "answer": 2
   },
   {
    "id": "kp5-15",
    "level": "KBAT",
    "q": "Semua pengguna diberi akses admin pada PC. Kesannya?",
    "options": [
     "Keselamatan meningkat",
     "Tiada risiko",
     "Sandaran automatik",
     "Malware boleh mendapat hak tinggi dengan mudah"
    ],
    "answer": 3
   },
   {
    "id": "kp5-16",
    "level": "KBAT",
    "q": "Ransomware menyerang dan tiada sandaran. Kesan utama?",
    "options": [
     "Data mungkin tidak dapat dipulihkan",
     "Data pulih serta-merta",
     "Tiada kesan",
     "OS menjadi lebih laju"
    ],
    "answer": 0
   },
   {
    "id": "kp5-17",
    "level": "KBAT",
    "q": "OS tidak lagi menerima sokongan vendor. Tindakan wajar?",
    "options": [
     "Abaikan",
     "Naik taraf kepada OS yang masih disokong",
     "Matikan antivirus",
     "Padam firewall"
    ],
    "answer": 1
   },
   {
    "id": "kp5-18",
    "level": "KBAT",
    "q": "Kemas kini dihantar terus ke semua PC tanpa ujian. Risikonya?",
    "options": [
     "Tiada risiko",
     "Semua PC lebih laju",
     "Konflik atau gangguan pada sistem sedia ada",
     "Kata laluan dipadam"
    ],
    "answer": 2
   },
   {
    "id": "kp5-19",
    "level": "KBAT",
    "q": "Antivirus tidak dikemas kini definisinya. Kesannya?",
    "options": [
     "Semua ancaman dikesan",
     "Antivirus lebih laju",
     "Tiada kesan",
     "Ancaman baharu mungkin tidak dikesan"
    ],
    "answer": 3
   },
   {
    "id": "kp5-20",
    "level": "KBAT",
    "q": "Hardening end node yang lengkap menggabungkan…",
    "options": [
     "Kemas kini, firewall, antivirus, penyulitan, kawalan akses dan sandaran",
     "Hanya antivirus",
     "Hanya kata laluan",
     "Hanya sandaran"
    ],
    "answer": 0
   }
  ]
 }
];
