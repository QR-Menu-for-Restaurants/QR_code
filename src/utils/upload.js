import multer from "multer";
import path from "path";

// Multerni to'g'ri sozlash
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads/");  // Faylni bu yo'lda saqlash
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Fayl nomini o'zgartirish
  },
});

const upload = multer({ storage: storage });

export default upload;
