// utils/upload.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// __dirname olish
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/public/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

export default upload;
