const makanan = "/assets/cat-makanan.jpg";
const kerajinan = "/assets/cat-kerajinan.jpg";
const fashion = "/assets/cat-fashion.jpg";
const jasa = "/assets/cat-jasa.jpg";

export type CategorySlug = "makanan" | "kerajinan" | "fashion" | "jasa";

export const categories: {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: ("beli" | "reservasi")[];
}[] = [
  {
    slug: "makanan",
    name: "Makanan & Minuman",
    tagline: "Cita rasa nusantara dari dapur lokal",
    description:
      "Dari warung makan hingga kedai kopi — pesan langsung atau reservasi meja di cabang terdekat.",
    image: makanan,
    features: ["beli", "reservasi"],
  },
  {
    slug: "kerajinan",
    name: "Kerajinan Tangan",
    tagline: "Karya tangan pengrajin lokal",
    description:
      "Anyaman, keramik, dan ukiran yang dibuat dengan teknik turun-temurun.",
    image: kerajinan,
    features: ["beli"],
  },
  {
    slug: "fashion",
    name: "Fashion & Tekstil",
    tagline: "Wastra modern, akar tradisional",
    description:
      "Batik, tenun, dan busana etnik kontemporer dari perajin daerah.",
    image: fashion,
    features: ["beli"],
  },
  {
    slug: "jasa",
    name: "Jasa & Layanan",
    tagline: "Layanan profesional UMKM lokal",
    description:
      "Salon, barbershop, fotografi produk, dan jasa kreatif lainnya dari pelaku usaha lokal.",
    image: jasa,
    features: ["beli"],
  },
];

export type Product = {
  id: string;
  umkmId: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type Umkm = {
  id: string;
  name: string;
  category: CategorySlug;
  tagline: string;
  description: string;
  image: string;
  established: string;
  owner: string;
  branches: string[];
  products: Product[];
};

export const umkms: Umkm[] = [
  // ========== MAKANAN ==========
  {
    id: "lala-geprek",
    name: "LALAgeprek",
    category: "makanan",
    tagline: "Ayam geprek sambal matah otentik",
    description:
      "Berdiri sejak 2018 di Bandung, LALAgeprek menyajikan ayam geprek dengan sambal racikan keluarga. Kini hadir di 4 cabang dengan ruang makan nyaman untuk keluarga dan komunitas.",
    image: makanan,
    established: "2018",
    owner: "Lala Putri",
    branches: [
      "Cabang Bandung Dago",
      "Cabang Bandung Buah Batu",
      "Cabang Jakarta Tebet",
      "Cabang Yogyakarta",
    ],
    products: [
      {
        id: "lala-geprek-orig",
        umkmId: "lala-geprek",
        name: "Geprek Original + Nasi",
        price: 22000,
        image: makanan,
        description:
          "Ayam geprek crispy dengan sambal bawang khas LALA, nasi hangat, lalapan.",
      },
      {
        id: "lala-geprek-mozza",
        umkmId: "lala-geprek",
        name: "Geprek Mozzarella",
        price: 32000,
        image: makanan,
        description:
          "Ayam geprek lumer dengan keju mozzarella leleh dan sambal matah.",
      },
      {
        id: "lala-paket-keluarga",
        umkmId: "lala-geprek",
        name: "Paket Keluarga (4 porsi)",
        price: 85000,
        image: makanan,
        description:
          "4 porsi geprek + 4 nasi + 4 es teh, hemat untuk makan bersama.",
      },
    ],
  },
  {
    id: "uda-sutan",
    name: "RM Uda Sutan",
    category: "makanan",
    tagline: "Rumah makan Padang turun-temurun",
    description:
      "Resep rendang dari nenek di Bukittinggi yang dimasak 8 jam dengan rempah pilihan. Sudah 3 generasi melayani pencinta masakan Padang otentik.",
    image: makanan,
    established: "1995",
    owner: "Uda Sutan Marajo",
    branches: [
      "Cabang Bandung Dago",
      "Cabang Jakarta Tebet",
      "Cabang Yogyakarta Malioboro",
    ],
    products: [
      {
        id: "rendang-padang",
        umkmId: "uda-sutan",
        name: "Paket Rendang Padang",
        price: 45000,
        image: makanan,
        description:
          "Rendang daging sapi dimasak 8 jam, nasi, dan sambal hijau.",
      },
      {
        id: "ayam-pop",
        umkmId: "uda-sutan",
        name: "Ayam Pop + Nasi",
        price: 38000,
        image: makanan,
        description:
          "Ayam pop khas Padang dengan kuah gulai dan sambal lado mudo.",
      },
      {
        id: "gulai-tunjang",
        umkmId: "uda-sutan",
        name: "Gulai Tunjang",
        price: 42000,
        image: makanan,
        description: "Tunjang sapi empuk dengan kuah gulai santan kental.",
      },
    ],
  },
  {
    id: "kedai-toraja",
    name: "Kedai Tana Toraja",
    category: "makanan",
    tagline: "Single origin coffee dari dataran tinggi",
    description:
      "Kedai kopi spesialis biji Toraja Sapan dan Kalosi. Roasting in-house setiap pekan, dengan ruang kerja nyaman dan WiFi cepat untuk freelancer.",
    image: makanan,
    established: "2020",
    owner: "Albert Pongbatu",
    branches: ["Cabang Bandung", "Cabang Surabaya"],
    products: [
      {
        id: "kopi-toraja-arabika",
        umkmId: "kedai-toraja",
        name: "Kopi Toraja Arabika 250g",
        price: 78000,
        image: makanan,
        description:
          "Single origin Toraja, medium roast, notes of dark chocolate and toffee.",
      },
      {
        id: "es-kopi-susu",
        umkmId: "kedai-toraja",
        name: "Es Kopi Susu Toraja",
        price: 25000,
        image: makanan,
        description: "Espresso Toraja dengan susu segar dan gula aren cair.",
      },
      {
        id: "manual-brew",
        umkmId: "kedai-toraja",
        name: "V60 Manual Brew",
        price: 35000,
        image: makanan,
        description:
          "Pilihan biji Sapan atau Kalosi, diseduh barista bersertifikat.",
      },
    ],
  },
  {
    id: "mbok-darmi",
    name: "Liwetan Mbok Darmi",
    category: "makanan",
    tagline: "Nasi liwet Solo legendaris",
    description:
      "Sejak 2005 menyajikan nasi liwet santan khas Solo dengan ayam suwir dan telur pindang. Cocok untuk acara keluarga atau makan siang prasmanan.",
    image: makanan,
    established: "2005",
    owner: "Mbok Darmi",
    branches: ["Cabang Solo", "Cabang Yogyakarta", "Cabang Semarang"],
    products: [
      {
        id: "nasi-liwet-komplit",
        umkmId: "mbok-darmi",
        name: "Nasi Liwet Komplit",
        price: 35000,
        image: makanan,
        description:
          "Nasi liwet santan, ayam suwir, telur pindang, sayur labu siam.",
      },
      {
        id: "ingkung-ayam",
        umkmId: "mbok-darmi",
        name: "Ingkung Ayam Kampung",
        price: 125000,
        image: makanan,
        description: "Ayam kampung utuh ungkep santan, untuk 4-5 orang.",
      },
    ],
  },

  // ========== KERAJINAN ==========
  {
    id: "atelier-tabanan",
    name: "Atelier Pengrajin Tabanan",
    category: "kerajinan",
    tagline: "Anyaman rotan Bali turun-temurun",
    description:
      "Kolektif 12 pengrajin perempuan di Desa Tabanan yang membuat anyaman rotan dengan teknik tradisional. Setiap karya butuh 3-7 hari pengerjaan.",
    image: kerajinan,
    established: "2012",
    owner: "Ni Wayan Sari",
    branches: [],
    products: [
      {
        id: "rotan-set-3",
        umkmId: "atelier-tabanan",
        name: "Set Keranjang Rotan 3pc",
        price: 285000,
        image: kerajinan,
        description: "Set 3 keranjang rotan ukuran S-M-L, anyaman tangan.",
      },
      {
        id: "tas-rotan",
        umkmId: "atelier-tabanan",
        name: "Tas Rotan Bulat",
        price: 195000,
        image: kerajinan,
        description:
          "Tas rotan bulat dengan tali kulit alami, cocok untuk pantai.",
      },
      {
        id: "lampu-rotan",
        umkmId: "atelier-tabanan",
        name: "Lampu Gantung Rotan",
        price: 425000,
        image: kerajinan,
        description: "Lampu gantung rotan diameter 40cm, suasana hangat.",
      },
    ],
  },
  {
    id: "kasongan-jaya",
    name: "Sanggar Kasongan Jaya",
    category: "kerajinan",
    tagline: "Keramik handmade Yogyakarta",
    description:
      "Sanggar keramik di Kasongan, Bantul. Membuat keramik fungsional dan dekoratif dengan glaze racikan sendiri menggunakan tanah liat lokal.",
    image: kerajinan,
    established: "2008",
    owner: "Pak Tukijo",
    branches: [],
    products: [
      {
        id: "vas-kasongan",
        umkmId: "kasongan-jaya",
        name: "Vas Keramik Kasongan",
        price: 165000,
        image: kerajinan,
        description: "Vas keramik handmade glaze earth tone.",
      },
      {
        id: "set-cangkir",
        umkmId: "kasongan-jaya",
        name: "Set Cangkir Keramik 4pc",
        price: 220000,
        image: kerajinan,
        description: "Set 4 cangkir + tatakan, motif batik tulis manual.",
      },
    ],
  },
  {
    id: "ukir-mulyo",
    name: "Sanggar Ukir Mulyo",
    category: "kerajinan",
    tagline: "Ukiran kayu jati Jepara klasik",
    description:
      "Sanggar warisan keluarga di Jepara yang melestarikan ukiran motif klasik. Menggunakan kayu jati pilihan berusia minimum 20 tahun.",
    image: kerajinan,
    established: "1988",
    owner: "Mas Mulyo",
    branches: [],
    products: [
      {
        id: "pajangan-jepara",
        umkmId: "ukir-mulyo",
        name: "Pajangan Ukir Jepara",
        price: 220000,
        image: kerajinan,
        description: "Pajangan ukiran kayu jati motif klasik.",
      },
      {
        id: "cermin-ukir",
        umkmId: "ukir-mulyo",
        name: "Cermin Bingkai Ukir",
        price: 685000,
        image: kerajinan,
        description: "Cermin dengan bingkai ukir tangan motif sulur.",
      },
    ],
  },

  // ========== FASHION ==========
  {
    id: "batik-mardini",
    name: "Batik Mardini",
    category: "fashion",
    tagline: "Batik tulis Pekalongan pewarna alami",
    description:
      "Studio batik tulis di Pekalongan yang menggunakan pewarna alami dari indigo, mengkudu, dan secang. Setiap kain dikerjakan 14-21 hari.",
    image: fashion,
    established: "2010",
    owner: "Ibu Mardini",
    branches: [],
    products: [
      {
        id: "batik-jlamprang",
        umkmId: "batik-mardini",
        name: "Batik Tulis Jlamprang 2m",
        price: 450000,
        image: fashion,
        description:
          "Kain batik tulis 2 meter, motif jlamprang khas Pekalongan.",
      },
      {
        id: "kemeja-batik",
        umkmId: "batik-mardini",
        name: "Kemeja Batik Pria",
        price: 285000,
        image: fashion,
        description: "Kemeja batik cap pria, bahan katun primissima.",
      },
    ],
  },
  {
    id: "wastra-lamatoro",
    name: "Wastra Lamatoro",
    category: "fashion",
    tagline: "Tenun ikat Sumba autentik",
    description:
      "Kelompok penenun perempuan di Sumba Timur. Setiap selendang dikerjakan 3 minggu dengan benang katun pilihan dan pewarna alami.",
    image: fashion,
    established: "2015",
    owner: "Mama Yohana",
    branches: [],
    products: [
      {
        id: "selendang-ntt",
        umkmId: "wastra-lamatoro",
        name: "Selendang Tenun Sumba",
        price: 380000,
        image: fashion,
        description: "Selendang tenun ikat dari Sumba Timur.",
      },
      {
        id: "sarung-tenun",
        umkmId: "wastra-lamatoro",
        name: "Sarung Tenun Pria",
        price: 525000,
        image: fashion,
        description: "Sarung tenun pria motif kuda Sumba.",
      },
    ],
  },
  {
    id: "lurik-klaten",
    name: "Lurik Klaten Project",
    category: "fashion",
    tagline: "Lurik tradisional, potongan modern",
    description:
      "Brand fashion yang merevitalisasi lurik tenun ATBM Klaten dengan desain kontemporer. Berkolaborasi dengan 8 penenun keluarga.",
    image: fashion,
    established: "2019",
    owner: "Dimas Aryo",
    branches: [],
    products: [
      {
        id: "blouse-lurik",
        umkmId: "lurik-klaten",
        name: "Blouse Lurik Modern",
        price: 215000,
        image: fashion,
        description: "Blouse lengan panjang berbahan lurik tradisional.",
      },
      {
        id: "outer-lurik",
        umkmId: "lurik-klaten",
        name: "Outer Lurik Unisex",
        price: 295000,
        image: fashion,
        description: "Outer kimono-style berbahan lurik Klaten.",
      },
    ],
  },

  // ========== JASA ==========
  {
    id: "pak-karto-barber",
    name: "Pak Karto Barbershop",
    category: "jasa",
    tagline: "Barbershop klasik dengan ritual hot towel",
    description:
      "Barbershop dengan suasana old-school. Spesialisasi potongan klasik, pomade, dan ritual hot towel. Sudah melayani 3 generasi pelanggan.",
    image: jasa,
    established: "2014",
    owner: "Pak Karto",
    branches: ["Cabang Bandung Dago", "Cabang Bandung Buah Batu"],
    products: [
      {
        id: "barber-classic",
        umkmId: "pak-karto-barber",
        name: "Voucher Classic Haircut",
        price: 65000,
        image: jasa,
        description: "Voucher potong rambut + hot towel + pijat kepala.",
      },
      {
        id: "pomade-karto",
        umkmId: "pak-karto-barber",
        name: "Pomade Pak Karto 100g",
        price: 95000,
        image: jasa,
        description: "Pomade water-based aroma vanilla, hold medium.",
      },
    ],
  },
  {
    id: "studio-lensa",
    name: "Studio Lokal Lensa",
    category: "jasa",
    tagline: "Foto produk untuk UMKM marketplace",
    description:
      "Studio fotografi yang fokus melayani UMKM. Paket foto produk dengan editing siap upload ke marketplace, harga sahabat UMKM.",
    image: jasa,
    established: "2021",
    owner: "Rio Pratama",
    branches: ["Cabang Jakarta", "Cabang Bandung"],
    products: [
      {
        id: "foto-produk-10",
        umkmId: "studio-lensa",
        name: "Voucher Foto 10 Produk",
        price: 350000,
        image: jasa,
        description:
          "Sesi foto 10 produk + editing basic + file marketplace-ready.",
      },
      {
        id: "foto-produk-25",
        umkmId: "studio-lensa",
        name: "Voucher Foto 25 Produk",
        price: 750000,
        image: jasa,
        description: "Paket lengkap untuk seller marketplace skala menengah.",
      },
    ],
  },
];

export const products: Product[] = umkms.flatMap((u) => u.products);

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getUmkmOfProduct = (id: string) =>
  umkms.find((u) => u.products.some((p) => p.id === id));
export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const getUmkm = (id: string) => umkms.find((u) => u.id === id);
export const getUmkmsByCategory = (slug: string) =>
  umkms.filter((u) => u.category === slug);
