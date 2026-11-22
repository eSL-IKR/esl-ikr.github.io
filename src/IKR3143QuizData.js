// QUIZ_IKR3143 — 20 soalan objektif setiap KP (7 mudah, 7 sederhana, 6 KBAT). answer = indeks pilihan betul (0–3)
export const QUIZ_IKR3143 = [
 {
  "kp": 1,
  "title": "Pengenalan kepada Network Security Hardening",
  "questions": [
   {
    "id": "kp1-1",
    "level": "mudah",
    "q": "Network Security Hardening bermaksud…",
    "options": [
     "Menambah kelajuan Internet",
     "Memperkukuh rangkaian dengan menutup kelemahan",
     "Menambah bilangan peranti",
     "Memadam semua data lama"
    ],
    "answer": 1
   },
   {
    "id": "kp1-2",
    "level": "mudah",
    "q": "Attack surface dapat dikurangkan dengan…",
    "options": [
     "Membuka semua port",
     "Menggunakan kata laluan lalai",
     "Menyahaktifkan servis dan menutup port yang tidak perlu",
     "Mematikan firewall"
    ],
    "answer": 2
   },
   {
    "id": "kp1-3",
    "level": "mudah",
    "q": "C dalam CIA Triad ialah…",
    "options": [
     "Control",
     "Connection",
     "Compression",
     "Confidentiality"
    ],
    "answer": 3
   },
   {
    "id": "kp1-4",
    "level": "mudah",
    "q": "Integrity memastikan…",
    "options": [
     "Data kekal tepat dan tidak diubah tanpa kebenaran",
     "Sistem sentiasa boleh diakses",
     "Data dihantar dengan laju",
     "Data disalin ke banyak lokasi"
    ],
    "answer": 0
   },
   {
    "id": "kp1-5",
    "level": "mudah",
    "q": "Serangan DoS menjejaskan prinsip…",
    "options": [
     "Confidentiality",
     "Availability",
     "Integrity",
     "Authentication"
    ],
    "answer": 1
   },
   {
    "id": "kp1-6",
    "level": "mudah",
    "q": "Pengesahan berbilang faktor (MFA) memerlukan…",
    "options": [
     "Satu kata laluan yang panjang",
     "Nama pengguna sahaja",
     "Lebih daripada satu langkah pengesahan",
     "Alamat IP sahaja"
    ],
    "answer": 2
   },
   {
    "id": "kp1-7",
    "level": "mudah",
    "q": "RBAC bermaksud…",
    "options": [
     "Remote Backup Access Control",
     "Router-Based Access Config",
     "Rapid Browser Access Check",
     "Role-Based Access Control"
    ],
    "answer": 3
   },
   {
    "id": "kp1-8",
    "level": "sederhana",
    "q": "Antara berikut, yang manakah ‘sesuatu yang pengguna miliki’ dalam MFA?",
    "options": [
     "Telefon yang menerima kod pengesahan",
     "Kata laluan",
     "Cap jari",
     "Nama pengguna"
    ],
    "answer": 0
   },
   {
    "id": "kp1-9",
    "level": "sederhana",
    "q": "Tiga rukun utama keselamatan rangkaian ialah…",
    "options": [
     "Router, switch dan firewall",
     "Manusia, proses dan teknologi",
     "Perisian, perkakasan dan kabel",
     "Pentadbir, pengguna dan penyerang"
    ],
    "answer": 1
   },
   {
    "id": "kp1-10",
    "level": "sederhana",
    "q": "Fungsi utama firewall ialah…",
    "options": [
     "Menyimpan data sandaran",
     "Menyulitkan cakera keras",
     "Menapis trafik masuk dan keluar berdasarkan peraturan",
     "Menambah bandwidth"
    ],
    "answer": 2
   },
   {
    "id": "kp1-11",
    "level": "sederhana",
    "q": "IPS berbeza daripada IDS kerana IPS…",
    "options": [
     "Hanya merekod log",
     "Hanya menyulitkan data",
     "Hanya membuat sandaran",
     "Boleh menyekat serangan secara aktif"
    ],
    "answer": 3
   },
   {
    "id": "kp1-12",
    "level": "sederhana",
    "q": "Patch keselamatan penting kerana ia…",
    "options": [
     "Menutup kelemahan yang diketahui",
     "Menukar rupa antara muka",
     "Mengurangkan saiz memori",
     "Memadam log lama"
    ],
    "answer": 0
   },
   {
    "id": "kp1-13",
    "level": "sederhana",
    "q": "Protokol yang melindungi data semasa transit ialah…",
    "options": [
     "HTTP biasa",
     "HTTPS/TLS",
     "Telnet",
     "FTP biasa"
    ],
    "answer": 1
   },
   {
    "id": "kp1-14",
    "level": "sederhana",
    "q": "Latihan kesedaran phishing menyokong rukun…",
    "options": [
     "Teknologi",
     "Perkakasan",
     "Manusia",
     "Kabel"
    ],
    "answer": 2
   },
   {
    "id": "kp1-15",
    "level": "KBAT",
    "q": "Sebuah syarikat membuka semua port ‘untuk memudahkan akses’. Kesan utamanya?",
    "options": [
     "Kelajuan pasti meningkat",
     "Risiko serangan berkurang",
     "Patch tidak lagi diperlukan",
     "Attack surface menjadi lebih besar"
    ],
    "answer": 3
   },
   {
    "id": "kp1-16",
    "level": "KBAT",
    "q": "Pekerja berkongsi kata laluan akaun. Prinsip yang paling terjejas ialah…",
    "options": [
     "Kerahsiaan dan pengesahan identiti",
     "Kelajuan sistem",
     "Saiz storan",
     "Jenis kabel"
    ],
    "answer": 0
   },
   {
    "id": "kp1-17",
    "level": "KBAT",
    "q": "Rekod pelanggan diubah penyerang semasa penghantaran. Prinsip CIA yang terjejas?",
    "options": [
     "Availability",
     "Integrity",
     "Confidentiality sahaja",
     "Tiada satu pun"
    ],
    "answer": 1
   },
   {
    "id": "kp1-18",
    "level": "KBAT",
    "q": "Pelayan web tidak boleh diakses akibat banjir trafik. Tindakan segera yang sesuai?",
    "options": [
     "Tambah kata laluan baharu",
     "Padam semua log",
     "Aktifkan IPS/firewall untuk menyekat trafik berlebihan",
     "Matikan pelayan selama-lamanya"
    ],
    "answer": 2
   },
   {
    "id": "kp1-19",
    "level": "KBAT",
    "q": "Mengapa hardening ‘bukan tugas sekali sahaja’?",
    "options": [
     "Peranti cepat rosak",
     "Kerana kos kabel naik",
     "Kerana pengguna bertukar kerja",
     "Ancaman dan kelemahan baharu sentiasa muncul"
    ],
    "answer": 3
   },
   {
    "id": "kp1-20",
    "level": "KBAT",
    "q": "Gabungan paling kukuh untuk akses pengguna ialah…",
    "options": [
     "Kata laluan kompleks + MFA + RBAC",
     "Kata laluan mudah + RBAC",
     "Hanya username",
     "Kata laluan lalai + 2FA tanpa had"
    ],
    "answer": 0
   }
  ]
 },
 {
  "kp": 2,
  "title": "Dasar & Saringan Keselamatan Rangkaian",
  "questions": [
   {
    "id": "kp2-1",
    "level": "mudah",
    "q": "Dasar keselamatan rangkaian ialah…",
    "options": [
     "Jenis kabel rangkaian",
     "Perisian antivirus",
     "Peraturan bertulis untuk melindungi dan mengawal penggunaan rangkaian",
     "Alat mengukur trafik"
    ],
    "answer": 2
   },
   {
    "id": "kp2-2",
    "level": "mudah",
    "q": "Saringan keselamatan rangkaian merujuk kepada…",
    "options": [
     "Menukar kata laluan sekali setahun",
     "Membeli peranti baharu",
     "Memadam fail lama",
     "Teknik memantau dan mengawal trafik untuk mengesan ancaman"
    ],
    "answer": 3
   },
   {
    "id": "kp2-3",
    "level": "mudah",
    "q": "Contoh alat saringan ialah…",
    "options": [
     "IDS/IPS",
     "Pencetak",
     "Monitor",
     "Kamera web"
    ],
    "answer": 0
   },
   {
    "id": "kp2-4",
    "level": "mudah",
    "q": "Penyulitan data bertujuan melindungi…",
    "options": [
     "Warna paparan",
     "Kerahsiaan data",
     "Saiz fail",
     "Kelajuan CPU"
    ],
    "answer": 1
   },
   {
    "id": "kp2-5",
    "level": "mudah",
    "q": "Ujian penetrasi bertujuan…",
    "options": [
     "Menambah port baharu",
     "Memasang sistem operasi",
     "Mencuba menceroboh secara sah untuk mencari kelemahan",
     "Menyalin semua data"
    ],
    "answer": 2
   },
   {
    "id": "kp2-6",
    "level": "mudah",
    "q": "Audit keselamatan menghasilkan…",
    "options": [
     "Kabel baharu",
     "Kata laluan baharu",
     "Lesen perisian",
     "Laporan penemuan dan cadangan penambahbaikan"
    ],
    "answer": 3
   },
   {
    "id": "kp2-7",
    "level": "mudah",
    "q": "Prinsip hak akses minimum bermaksud…",
    "options": [
     "Pengguna hanya diberi akses yang perlu untuk tugasnya",
     "Semua pengguna menjadi admin",
     "Tiada pengguna boleh akses",
     "Akses sama untuk semua"
    ],
    "answer": 0
   },
   {
    "id": "kp2-8",
    "level": "sederhana",
    "q": "Pemeriksaan SQL injection dan XSS tergolong dalam…",
    "options": [
     "Pemeriksaan kabel",
     "Pemeriksaan keselamatan aplikasi",
     "Sandaran data",
     "Penyulitan cakera"
    ],
    "answer": 1
   },
   {
    "id": "kp2-9",
    "level": "sederhana",
    "q": "Pemeriksaan konfigurasi rangkaian merangkumi semakan ke atas…",
    "options": [
     "Warna kabinet",
     "Harga peranti",
     "Firewall, router dan peranti keselamatan",
     "Jenama monitor"
    ],
    "answer": 2
   },
   {
    "id": "kp2-10",
    "level": "sederhana",
    "q": "Selepas perancangan audit, auditor biasanya…",
    "options": [
     "Menulis laporan akhir terus",
     "Memadam log",
     "Membeli firewall baharu",
     "Mengumpul dan menilai data"
    ],
    "answer": 3
   },
   {
    "id": "kp2-11",
    "level": "sederhana",
    "q": "Laporan audit biasanya mengandungi…",
    "options": [
     "Ringkasan eksekutif, penemuan, risiko dan cadangan",
     "Hanya senarai harga",
     "Gambar pejabat",
     "Resit pembelian"
    ],
    "answer": 0
   },
   {
    "id": "kp2-12",
    "level": "sederhana",
    "q": "Pelan respons insiden diperlukan untuk…",
    "options": [
     "Menghias pejabat",
     "Bertindak dengan teratur apabila berlaku serangan atau kebocoran",
     "Mengira gaji",
     "Membuat iklan"
    ],
    "answer": 1
   },
   {
    "id": "kp2-13",
    "level": "sederhana",
    "q": "Dasar keselamatan perlu dikaji berkala kerana…",
    "options": [
     "Peraturan lama lebih baik",
     "Tiada sebab khusus",
     "Ancaman dan teknologi sentiasa berubah",
     "Untuk menukar warna logo"
    ],
    "answer": 2
   },
   {
    "id": "kp2-14",
    "level": "sederhana",
    "q": "Sandaran data amat penting terutamanya terhadap…",
    "options": [
     "Habuk",
     "Suhu bilik",
     "Bunyi bising",
     "Ransomware"
    ],
    "answer": 3
   },
   {
    "id": "kp2-15",
    "level": "KBAT",
    "q": "Firewall tersalah konfigurasi membuka port tidak perlu. Kesannya?",
    "options": [
     "Membuka ruang untuk pencerobohan",
     "Rangkaian menjadi lebih selamat",
     "Trafik menjadi lebih laju",
     "Tiada kesan"
    ],
    "answer": 0
   },
   {
    "id": "kp2-16",
    "level": "KBAT",
    "q": "Syarikat mempunyai dasar tetapi tiada audit. Risikonya?",
    "options": [
     "Dasar dikuatkuasa secara automatik",
     "Tidak diketahui sama ada dasar dipatuhi dan kelemahan terlepas pandang",
     "Semua ancaman hilang",
     "Kos berkurang tanpa risiko"
    ],
    "answer": 1
   },
   {
    "id": "kp2-17",
    "level": "KBAT",
    "q": "Pernyataan paling tepat tentang dasar dan saringan?",
    "options": [
     "Dasar dan saringan sama sahaja",
     "Saringan menggantikan dasar",
     "Dasar menetapkan peraturan; saringan memantau dan menguatkuasa dengan alat",
     "Dasar hanya untuk pengguna rumah"
    ],
    "answer": 2
   },
   {
    "id": "kp2-18",
    "level": "KBAT",
    "q": "Trafik luar biasa dikesan pada pukul 3 pagi. Alat paling sesuai untuk mengesannya?",
    "options": [
     "Pencetak rangkaian",
     "Perisian pejabat",
     "UPS",
     "IDS/IPS dan pemantauan trafik"
    ],
    "answer": 3
   },
   {
    "id": "kp2-19",
    "level": "KBAT",
    "q": "Auditor menemui perisian lama tidak dikemas kini. Cadangan terbaik?",
    "options": [
     "Pasang patch dan tetapkan jadual kemas kini berkala",
     "Biarkan sahaja",
     "Padam laporan",
     "Matikan semua pengguna"
    ],
    "answer": 0
   },
   {
    "id": "kp2-20",
    "level": "KBAT",
    "q": "Mengapa MFA diwajibkan dalam dasar keselamatan?",
    "options": [
     "MFA menambah kelajuan",
     "Kata laluan sahaja mudah dicuri atau diteka",
     "MFA mengurangkan trafik",
     "MFA menggantikan firewall"
    ],
    "answer": 1
   }
  ]
 },
 {
  "kp": 3,
  "title": "Nasihat Keselamatan Rangkaian & Kemas Kini Tindak Balas Ancaman",
  "questions": [
   {
    "id": "kp3-1",
    "level": "mudah",
    "q": "Security advisory ialah…",
    "options": [
     "Iklan produk",
     "Jadual cuti",
     "Senarai harga perisian",
     "Makluman tentang kerentanan dan panduan tindakan"
    ],
    "answer": 3
   },
   {
    "id": "kp3-2",
    "level": "mudah",
    "q": "Response time yang pantas membantu…",
    "options": [
     "Meminimumkan kesan kerosakan dan kos pemulihan",
     "Menambah kos",
     "Melambatkan pemulihan",
     "Mengurangkan latihan"
    ],
    "answer": 0
   },
   {
    "id": "kp3-3",
    "level": "mudah",
    "q": "CSIRT bermaksud…",
    "options": [
     "Central Server Internet Routing Table",
     "Computer Security Incident Response Team",
     "Cyber Storage Integrated Response Tool",
     "Computer System Internal Repair Team"
    ],
    "answer": 1
   },
   {
    "id": "kp3-4",
    "level": "mudah",
    "q": "SOC bermaksud…",
    "options": [
     "System Output Control",
     "Secure Online Connection",
     "Security Operations Center",
     "Software Operation Console"
    ],
    "answer": 2
   },
   {
    "id": "kp3-5",
    "level": "mudah",
    "q": "Serangan WannaCry 2017 berpunca terutamanya daripada…",
    "options": [
     "Kabel rosak",
     "Bekalan elektrik terputus",
     "Kata laluan terlalu panjang",
     "Sistem yang tidak dikemas kini"
    ],
    "answer": 3
   },
   {
    "id": "kp3-6",
    "level": "mudah",
    "q": "SIEM berfungsi…",
    "options": [
     "Mengumpul dan menganalisis log dari pelbagai sumber",
     "Mencetak dokumen",
     "Menyulitkan e-mel sahaja",
     "Memperkuat isyarat Wi-Fi"
    ],
    "answer": 0
   },
   {
    "id": "kp3-7",
    "level": "mudah",
    "q": "SNMP digunakan untuk…",
    "options": [
     "Memuat turun fail",
     "Memantau status peranti rangkaian seperti uptime dan beban",
     "Menghantar e-mel",
     "Mengedit imej"
    ],
    "answer": 1
   },
   {
    "id": "kp3-8",
    "level": "sederhana",
    "q": "Antara komponen nasihat keselamatan ialah…",
    "options": [
     "Resipi masakan",
     "Senarai gaji",
     "Kerentanan, sistem terjejas, tahap keparahan dan penyelesaian",
     "Jadual kelas"
    ],
    "answer": 2
   },
   {
    "id": "kp3-9",
    "level": "sederhana",
    "q": "Tabletop exercise ialah…",
    "options": [
     "Ujian kabel",
     "Pemasangan meja",
     "Sandaran data",
     "Latihan simulasi insiden untuk menguji pelan tindak balas"
    ],
    "answer": 3
   },
   {
    "id": "kp3-10",
    "level": "sederhana",
    "q": "Urutan kemas kini yang selamat ialah…",
    "options": [
     "Uji → sandaran → pasang → pantau",
     "Pasang → lupakan",
     "Pantau → padam → pasang",
     "Pasang terus tanpa sandaran"
    ],
    "answer": 0
   },
   {
    "id": "kp3-11",
    "level": "sederhana",
    "q": "Prinsip Zero Trust ialah…",
    "options": [
     "Semua pengguna dalaman dipercayai",
     "Tiada entiti dipercayai secara automatik",
     "Hanya admin diperiksa",
     "Percaya semua peranti berwayar"
    ],
    "answer": 1
   },
   {
    "id": "kp3-12",
    "level": "sederhana",
    "q": "Wireshark ialah alat…",
    "options": [
     "Antivirus",
     "Firewall perkakasan",
     "Packet capture untuk menganalisis paket",
     "Penyulitan cakera"
    ],
    "answer": 2
   },
   {
    "id": "kp3-13",
    "level": "sederhana",
    "q": "EDR/XDR menyediakan…",
    "options": [
     "Penyejukan server",
     "Pencetakan dokumen",
     "Kabel gentian optik",
     "Pengesanan dan tindak balas ancaman termaju"
    ],
    "answer": 3
   },
   {
    "id": "kp3-14",
    "level": "sederhana",
    "q": "Cabaran ‘false positives’ ialah…",
    "options": [
     "Amaran palsu yang menyebabkan keletihan respons",
     "Serangan tidak dikesan langsung",
     "Kabel terputus",
     "Kehabisan lesen"
    ],
    "answer": 0
   },
   {
    "id": "kp3-15",
    "level": "KBAT",
    "q": "Sistem lama (legacy) menjadi cabaran kerana…",
    "options": [
     "Terlalu laju",
     "Tiada lagi patch daripada vendor sehingga kekal rentan",
     "Terlalu selamat",
     "Menggunakan terlalu sedikit kuasa"
    ],
    "answer": 1
   },
   {
    "id": "kp3-16",
    "level": "KBAT",
    "q": "Contoh automasi tindak balas insiden ialah…",
    "options": [
     "Menukar wallpaper",
     "Mencetak laporan",
     "Mengasingkan peranti dijangkiti dan menyekat IP mencurigakan",
     "Menutup pejabat"
    ],
    "answer": 2
   },
   {
    "id": "kp3-17",
    "level": "KBAT",
    "q": "Zero Trust bersama segmentasi rangkaian membantu mengurangkan…",
    "options": [
     "Bilangan pengguna",
     "Saiz kabel",
     "Penggunaan elektrik",
     "Pergerakan lateral penyerang"
    ],
    "answer": 3
   },
   {
    "id": "kp3-18",
    "level": "KBAT",
    "q": "Cabaran pemantauan berterusan dari segi privasi ialah…",
    "options": [
     "Mengimbangi pemantauan dengan hak privasi pengguna",
     "Pemantauan tidak boleh dilakukan",
     "Tiada data dikumpul",
     "Privasi tidak penting"
    ],
    "answer": 0
   },
   {
    "id": "kp3-19",
    "level": "KBAT",
    "q": "Mengapa latihan kesedaran perlu disertakan dengan nasihat keselamatan?",
    "options": [
     "Pengguna tidak perlu tahu",
     "Pengguna sering menjadi titik paling lemah",
     "Untuk menggantikan patch",
     "Untuk mengurangkan log"
    ],
    "answer": 1
   },
   {
    "id": "kp3-20",
    "level": "KBAT",
    "q": "SOC menerima ribuan amaran sehari. Penyelesaian paling sesuai?",
    "options": [
     "Abaikan semua amaran",
     "Matikan IDS",
     "Security automation and orchestration",
     "Kurangkan pekerja"
    ],
    "answer": 2
   }
  ]
 },
 {
  "kp": 4,
  "title": "Keselamatan Peralatan Rangkaian",
  "questions": [
   {
    "id": "kp4-1",
    "level": "mudah",
    "q": "OSPF ialah protokol jenis…",
    "options": [
     "Link-state",
     "Distance-vector sahaja",
     "Protokol e-mel",
     "Protokol Wi-Fi"
    ],
    "answer": 0
   },
   {
    "id": "kp4-2",
    "level": "mudah",
    "q": "BGP digunakan untuk routing antara…",
    "options": [
     "Dua komputer dalam satu meja",
     "Autonomous Systems (cth ISP)",
     "Dua pencetak",
     "Telefon dan TV"
    ],
    "answer": 1
   },
   {
    "id": "kp4-3",
    "level": "mudah",
    "q": "Tindakan firewall yang membuang paket tanpa memberi respons kepada penghantar ialah…",
    "options": [
     "Allow",
     "Permit",
     "Drop",
     "Forward"
    ],
    "answer": 2
   },
   {
    "id": "kp4-4",
    "level": "mudah",
    "q": "Port 443 digunakan oleh…",
    "options": [
     "HTTP",
     "Telnet",
     "FTP",
     "HTTPS"
    ],
    "answer": 3
   },
   {
    "id": "kp4-5",
    "level": "mudah",
    "q": "Mod violation port security yang mematikan port ialah…",
    "options": [
     "Shutdown",
     "Protect",
     "Restrict",
     "Forward"
    ],
    "answer": 0
   },
   {
    "id": "kp4-6",
    "level": "mudah",
    "q": "Penyulitan Wi-Fi paling selamat antara berikut ialah…",
    "options": [
     "WEP",
     "WPA3",
     "WPA",
     "Tanpa penyulitan"
    ],
    "answer": 1
   },
   {
    "id": "kp4-7",
    "level": "mudah",
    "q": "Berbanding Telnet, SSH…",
    "options": [
     "Tidak disulitkan",
     "Lebih perlahan sahaja",
     "Menyulitkan sesi akses jauh",
     "Hanya untuk Wi-Fi"
    ],
    "answer": 2
   },
   {
    "id": "kp4-8",
    "level": "sederhana",
    "q": "Firewall membaca peraturan…",
    "options": [
     "Dari bawah ke atas",
     "Secara rawak",
     "Hanya peraturan terakhir",
     "Dari atas ke bawah dan melaksanakan padanan pertama"
    ],
    "answer": 3
   },
   {
    "id": "kp4-9",
    "level": "sederhana",
    "q": "Whitelisting bermaksud…",
    "options": [
     "Hanya trafik yang disenaraikan dibenarkan",
     "Semua trafik dibenarkan kecuali senarai",
     "Semua trafik disekat selama-lamanya",
     "Trafik dipilih rawak"
    ],
    "answer": 0
   },
   {
    "id": "kp4-10",
    "level": "sederhana",
    "q": "Sticky MAC ialah…",
    "options": [
     "MAC ditukar setiap saat",
     "Alamat MAC dipelajari automatik dan dikunci pada port",
     "MAC dipadam",
     "MAC disembunyikan di Wi-Fi"
    ],
    "answer": 1
   },
   {
    "id": "kp4-11",
    "level": "sederhana",
    "q": "Mod Restrict berbeza daripada Protect kerana…",
    "options": [
     "Mematikan port",
     "Tidak menyekat apa-apa",
     "Menjana log dan amaran",
     "Menukar alamat MAC"
    ],
    "answer": 2
   },
   {
    "id": "kp4-12",
    "level": "sederhana",
    "q": "802.1X dengan RADIUS memberi…",
    "options": [
     "Penyulitan cakera",
     "Sandaran data",
     "Penambahan bandwidth",
     "Pengesahan berasaskan akaun pengguna"
    ],
    "answer": 3
   },
   {
    "id": "kp4-13",
    "level": "sederhana",
    "q": "Rogue AP ialah…",
    "options": [
     "Access point palsu yang meniru SSID asal",
     "AP yang paling laju",
     "AP rasmi organisasi",
     "AP yang ditutup"
    ],
    "answer": 0
   },
   {
    "id": "kp4-14",
    "level": "sederhana",
    "q": "EIGRP ialah protokol…",
    "options": [
     "Milik Microsoft",
     "Hibrid milik Cisco",
     "Untuk Wi-Fi sahaja",
     "Untuk e-mel"
    ],
    "answer": 1
   },
   {
    "id": "kp4-15",
    "level": "KBAT",
    "q": "Port dikonfigurasi mod Protect dan pentadbir tidak nampak sebarang amaran. Sebabnya?",
    "options": [
     "Port rosak",
     "Switch dimatikan",
     "Protect tidak menjana log atau amaran",
     "Kabel terputus"
    ],
    "answer": 2
   },
   {
    "id": "kp4-16",
    "level": "KBAT",
    "q": "Cara terbaik mengasingkan trafik tetamu daripada dalaman ialah…",
    "options": [
     "Guna SSID sama dan kata laluan sama",
     "Matikan semua Wi-Fi",
     "Buka rangkaian dalaman kepada tetamu",
     "SSID tetamu berasingan dengan VLAN"
    ],
    "answer": 3
   },
   {
    "id": "kp4-17",
    "level": "KBAT",
    "q": "Peraturan ‘Allow any’ diletakkan paling atas. Kesannya?",
    "options": [
     "Peraturan di bawahnya tidak lagi menyekat apa-apa",
     "Semua trafik disekat",
     "Firewall menjadi lebih selamat",
     "Tiada kesan"
    ],
    "answer": 0
   },
   {
    "id": "kp4-18",
    "level": "KBAT",
    "q": "Adakah menyembunyikan SSID mencukupi sebagai keselamatan?",
    "options": [
     "Ya, sepenuhnya selamat",
     "Tidak, ia hanya langkah tambahan",
     "Ya, tidak perlu penyulitan",
     "Ya, kerana penyerang tak boleh scan"
    ],
    "answer": 1
   },
   {
    "id": "kp4-19",
    "level": "KBAT",
    "q": "Kuasa isyarat AP dikurangkan supaya…",
    "options": [
     "Wi-Fi menjadi lebih laju",
     "Kos elektrik naik",
     "Liputan tidak melangkaui sempadan premis",
     "Pengguna lebih ramai"
    ],
    "answer": 2
   },
   {
    "id": "kp4-20",
    "level": "KBAT",
    "q": "Mengapa kata laluan lalai peralatan perlu ditukar segera?",
    "options": [
     "Kerana lalai terlalu panjang",
     "Kerana lalai terlalu selamat",
     "Kerana lalai tidak boleh disimpan",
     "Kata laluan lalai diketahui umum"
    ],
    "answer": 3
   }
  ]
 },
 {
  "kp": 5,
  "title": "Pengukuhan Tahap Keselamatan Rangkaian",
  "questions": [
   {
    "id": "kp5-1",
    "level": "mudah",
    "q": "Ciri logging berfungsi…",
    "options": [
     "Menyejukkan peranti",
     "Merekod aktiviti peranti dan sistem",
     "Menambah bandwidth",
     "Memadam trafik"
    ],
    "answer": 1
   },
   {
    "id": "kp5-2",
    "level": "mudah",
    "q": "Kata laluan yang kuat ialah…",
    "options": [
     "Nama sendiri",
     "123456",
     "Kompleks, panjang dan unik",
     "Sama untuk semua peranti"
    ],
    "answer": 2
   },
   {
    "id": "kp5-3",
    "level": "mudah",
    "q": "Anti-spoofing mencegah…",
    "options": [
     "Kehabisan memori",
     "Kerosakan kabel",
     "Suhu tinggi",
     "Peniruan identiti seperti IP atau MAC palsu"
    ],
    "answer": 3
   },
   {
    "id": "kp5-4",
    "level": "mudah",
    "q": "Patch ialah…",
    "options": [
     "Kemas kini kecil untuk membetulkan kelemahan tertentu",
     "Peranti baharu",
     "Kabel tambahan",
     "Pengganti OS sepenuhnya sahaja"
    ],
    "answer": 0
   },
   {
    "id": "kp5-5",
    "level": "mudah",
    "q": "SNMPv3 menambah…",
    "options": [
     "Kelajuan Wi-Fi",
     "Pengesahan dan penyulitan",
     "Saiz fail",
     "Warna dashboard"
    ],
    "answer": 1
   },
   {
    "id": "kp5-6",
    "level": "mudah",
    "q": "TLS digunakan secara meluas pada…",
    "options": [
     "Pencetak",
     "Kabel USB",
     "HTTPS",
     "Bateri"
    ],
    "answer": 2
   },
   {
    "id": "kp5-7",
    "level": "mudah",
    "q": "AES ialah penyulitan jenis…",
    "options": [
     "Asimetrik sahaja",
     "Tanpa kunci",
     "Hanya untuk imej",
     "Simetrik"
    ],
    "answer": 3
   },
   {
    "id": "kp5-8",
    "level": "sederhana",
    "q": "RSA menggunakan…",
    "options": [
     "Pasangan kunci awam dan kunci persendirian",
     "Satu kunci sahaja",
     "Tiada kunci",
     "Kata laluan Wi-Fi"
    ],
    "answer": 0
   },
   {
    "id": "kp5-9",
    "level": "sederhana",
    "q": "3DES ialah…",
    "options": [
     "Protokol routing",
     "Peningkatan DES dengan tiga lapisan penyulitan",
     "Alat pemantauan",
     "Jenis firewall"
    ],
    "answer": 1
   },
   {
    "id": "kp5-10",
    "level": "sederhana",
    "q": "Kelebihan SSH ialah…",
    "options": [
     "Sesi tidak disulitkan",
     "Hanya untuk pencetak",
     "Sesi akses jauh disulitkan",
     "Hanya untuk Wi-Fi"
    ],
    "answer": 2
   },
   {
    "id": "kp5-11",
    "level": "sederhana",
    "q": "Tambahan keselamatan WPA3 berbanding WPA2 ialah…",
    "options": [
     "Tiada penyulitan",
     "Hanya untuk kabel",
     "Menggunakan WEP",
     "Perlindungan lebih baik terhadap serangan brute-force"
    ],
    "answer": 3
   },
   {
    "id": "kp5-12",
    "level": "sederhana",
    "q": "Log berguna untuk…",
    "options": [
     "Forensik dan mengesan aktiviti mencurigakan",
     "Mencetak gambar",
     "Menyejukkan server",
     "Mengubah IP secara rawak"
    ],
    "answer": 0
   },
   {
    "id": "kp5-13",
    "level": "sederhana",
    "q": "Kata laluan peranti sepatutnya ditukar…",
    "options": [
     "Tidak pernah",
     "Secara berkala",
     "Hanya semasa rosak",
     "Setiap kali menonton TV"
    ],
    "answer": 1
   },
   {
    "id": "kp5-14",
    "level": "sederhana",
    "q": "Tandatangan digital dalam RSA membantu…",
    "options": [
     "Menambah RAM",
     "Memadam virus",
     "Pengesahan identiti pengirim",
     "Menukar IP"
    ],
    "answer": 2
   },
   {
    "id": "kp5-15",
    "level": "KBAT",
    "q": "Untuk menyulitkan data berjumlah besar, algoritma yang lebih sesuai ialah…",
    "options": [
     "RSA kerana pasti lebih pantas",
     "3DES kerana paling moden",
     "Tiada penyulitan",
     "AES kerana lebih pantas"
    ],
    "answer": 3
   },
   {
    "id": "kp5-16",
    "level": "KBAT",
    "q": "Berbanding AES, 3DES…",
    "options": [
     "Lebih perlahan dan kurang selamat",
     "Lebih pantas dan lebih selamat",
     "Sama sahaja",
     "Tidak menggunakan kunci"
    ],
    "answer": 0
   },
   {
    "id": "kp5-17",
    "level": "KBAT",
    "q": "Mengapa SNMPv2c berisiko?",
    "options": [
     "Terlalu selamat",
     "Kekurangan penyulitan dan pengesahan yang kukuh",
     "Hanya untuk Wi-Fi",
     "Tidak menggunakan IP"
    ],
    "answer": 1
   },
   {
    "id": "kp5-18",
    "level": "KBAT",
    "q": "Log menunjukkan satu IP muncul dengan MAC berbeza-beza. Kemungkinan?",
    "options": [
     "Kabel baharu",
     "Kemas kini OS",
     "Percubaan spoofing",
     "Sandaran berjaya"
    ],
    "answer": 2
   },
   {
    "id": "kp5-19",
    "level": "KBAT",
    "q": "Patch kritikal tidak dipasang enam bulan. Risikonya?",
    "options": [
     "Sistem menjadi lebih selamat",
     "Log hilang",
     "Tiada risiko",
     "Kelemahan boleh dieksploitasi penyerang"
    ],
    "answer": 3
   },
   {
    "id": "kp5-20",
    "level": "KBAT",
    "q": "Gabungan protokol untuk akses CLI selamat dan laman web selamat ialah…",
    "options": [
     "SSH dan TLS/HTTPS",
     "Telnet dan HTTP",
     "FTP dan Telnet",
     "HTTP dan SNMPv1"
    ],
    "answer": 0
   }
  ]
 },
 {
  "kp": 6,
  "title": "Pemeliharaan Keselamatan Sistem Pengoperasian Rangkaian",
  "questions": [
   {
    "id": "kp6-1",
    "level": "mudah",
    "q": "Pemeliharaan keselamatan OS rangkaian ialah…",
    "options": [
     "Pemasangan kabel",
     "Penukaran warna paparan",
     "Langkah berterusan memastikan OS kekal selamat",
     "Pembelian peranti"
    ],
    "answer": 2
   },
   {
    "id": "kp6-2",
    "level": "mudah",
    "q": "Kemas kini keselamatan boleh berupa…",
    "options": [
     "Hanya cat dinding",
     "Hanya kabel baharu",
     "Hanya penukaran jenama",
     "Patch, kemas kini berkala dan upgrade versi"
    ],
    "answer": 3
   },
   {
    "id": "kp6-3",
    "level": "mudah",
    "q": "Service pack ialah…",
    "options": [
     "Himpunan kemas kini yang lebih besar",
     "Satu pembetulan kecil",
     "Jenis kabel",
     "Alat pemantauan"
    ],
    "answer": 0
   },
   {
    "id": "kp6-4",
    "level": "mudah",
    "q": "Patch berbeza daripada service pack kerana patch…",
    "options": [
     "Sentiasa lebih besar",
     "Kecil dan khusus",
     "Tidak membetulkan apa-apa",
     "Hanya untuk perkakasan"
    ],
    "answer": 1
   },
   {
    "id": "kp6-5",
    "level": "mudah",
    "q": "Port yang tidak digunakan sepatutnya…",
    "options": [
     "Dibuka kepada semua",
     "Diberi kata laluan lalai",
     "Dimatikan",
     "Disambung ke Internet"
    ],
    "answer": 2
   },
   {
    "id": "kp6-6",
    "level": "mudah",
    "q": "CCTV di bilik server berfungsi…",
    "options": [
     "Menyejukkan server",
     "Menyulitkan data",
     "Menambah RAM",
     "Memantau aktiviti fizikal"
    ],
    "answer": 3
   },
   {
    "id": "kp6-7",
    "level": "mudah",
    "q": "UPS melindungi peralatan daripada…",
    "options": [
     "Gangguan bekalan elektrik",
     "Virus",
     "Phishing",
     "Serangan DoS"
    ],
    "answer": 0
   },
   {
    "id": "kp6-8",
    "level": "sederhana",
    "q": "Sebelum kemas kini dilaksanakan, perlu dilakukan…",
    "options": [
     "Padam semua log",
     "Ujian pra-pelaksanaan dan sandaran",
     "Matikan firewall",
     "Tukar semua IP"
    ],
    "answer": 1
   },
   {
    "id": "kp6-9",
    "level": "sederhana",
    "q": "Langkah mengurus kemas kini kerentan termasuk…",
    "options": [
     "Mengabaikan kerentan",
     "Memadam sistem",
     "Pengesanan, pelaksanaan segera, ujian dan penyelenggaraan",
     "Menunggu serangan"
    ],
    "answer": 2
   },
   {
    "id": "kp6-10",
    "level": "sederhana",
    "q": "RBAC dalam akses peralatan bermaksud…",
    "options": [
     "Semua pengguna akses penuh",
     "Tiada akses",
     "Akses rawak",
     "Akses mengikut peranan pengguna"
    ],
    "answer": 3
   },
   {
    "id": "kp6-11",
    "level": "sederhana",
    "q": "Akses jauh ke peralatan sepatutnya menggunakan…",
    "options": [
     "SSH",
     "Telnet",
     "HTTP biasa",
     "FTP"
    ],
    "answer": 0
   },
   {
    "id": "kp6-12",
    "level": "sederhana",
    "q": "Sekatan berasaskan IP membolehkan…",
    "options": [
     "Akses dari mana-mana sahaja",
     "Akses hanya dari alamat IP yang sah",
     "Penyulitan automatik",
     "Penambahan kelajuan"
    ],
    "answer": 1
   },
   {
    "id": "kp6-13",
    "level": "sederhana",
    "q": "Sandaran dan pemulihan OS bertujuan…",
    "options": [
     "Menambah iklan",
     "Mengubah topologi",
     "Memulihkan sistem selepas insiden atau kegagalan",
     "Mematikan log"
    ],
    "answer": 2
   },
   {
    "id": "kp6-14",
    "level": "sederhana",
    "q": "Kawalan akses fizikal termasuk…",
    "options": [
     "Wallpaper",
     "Perisian permainan",
     "Skrin saver",
     "Pintu berkunci, kad akses dan biometrik"
    ],
    "answer": 3
   },
   {
    "id": "kp6-15",
    "level": "KBAT",
    "q": "Server beroperasi 24/7. Pendekatan kemas kini terbaik?",
    "options": [
     "Jadual terancang untuk mengelakkan gangguan operasi",
     "Kemas kini rawak pada waktu puncak",
     "Tidak pernah kemas kini",
     "Matikan server sebulan"
    ],
    "answer": 0
   },
   {
    "id": "kp6-16",
    "level": "KBAT",
    "q": "Port Telnet terbuka tetapi tidak digunakan. Risikonya?",
    "options": [
     "Rangkaian lebih laju",
     "Akses tanpa kebenaran dan eksploitasi",
     "Log berkurang",
     "Tiada risiko"
    ],
    "answer": 1
   },
   {
    "id": "kp6-17",
    "level": "KBAT",
    "q": "Bug kritikal perlu dibaiki segera pada satu fungsi. Pilihan paling sesuai?",
    "options": [
     "Service pack besar tanpa ujian",
     "Beli peranti baharu",
     "Patch",
     "Abaikan"
    ],
    "answer": 2
   },
   {
    "id": "kp6-18",
    "level": "KBAT",
    "q": "Sistem menjadi lambat selepas kemas kini. Langkah wajar?",
    "options": [
     "Padam semua pengguna",
     "Matikan antivirus",
     "Biarkan",
     "Pantau selepas kemas kini dan pulihkan daripada sandaran jika perlu"
    ],
    "answer": 3
   },
   {
    "id": "kp6-19",
    "level": "KBAT",
    "q": "Selain keselamatan, mematikan port tidak digunakan juga…",
    "options": [
     "Mengurangkan pemprosesan trafik tidak perlu",
     "Menambah serangan",
     "Memadam OS",
     "Menutup Internet"
    ],
    "answer": 0
   },
   {
    "id": "kp6-20",
    "level": "KBAT",
    "q": "Piawaian seperti ISO/IEC 27001 menekankan…",
    "options": [
     "Pengabaian patch",
     "Kemas kini kerentan dan pematuhan berkala",
     "Kata laluan lalai",
     "Penggunaan Telnet"
    ],
    "answer": 1
   }
  ]
 }
];
