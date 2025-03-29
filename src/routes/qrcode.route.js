import { Router } from "express";
import { getLocalIp,generateQR } from "../controller/qrcode.controller.js";

const router = Router();
router.get("/local-ip",getLocalIp);
router.get("/qrcode", generateQR);

export default router;
