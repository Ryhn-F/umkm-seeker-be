const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for product images
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "umkm-seeker/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Storage for KTP images
const ktpStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "umkm-seeker/ktp",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Storage for UMKM logo images
const logoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "umkm-seeker/logos",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Dynamic storage that picks folder based on field name
const registrationStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "umkm-seeker/misc";
    if (file.fieldname === "foto_ktp") {
      folder = "umkm-seeker/ktp";
    } else if (file.fieldname === "foto_logo_umkm") {
      folder = "umkm-seeker/logos";
    }
    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    };
  },
});

const upload = multer({ storage: productStorage });

const uploadRegistration = multer({ storage: registrationStorage });

module.exports = { cloudinary, upload, uploadRegistration };
