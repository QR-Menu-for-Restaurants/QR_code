import { Router } from "express";
import { generateQR } from "../controller/qrcode.controller.js";

const router = Router();
router.get("/qrcode", generateQR);

export default router;
