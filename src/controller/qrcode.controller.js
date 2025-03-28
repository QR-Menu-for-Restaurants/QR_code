import QRCode from 'qrcode';
import os from 'os';
import { PORT } from '../config/app.config.js';

const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
};

export const generateQR = async (req, res) => {
    try {
        const localIp = getLocalIp();
        const qrUrl = `http://${localIp}:${PORT}/register`; 
        const qrImage = await QRCode.toDataURL(qrUrl);

        res.render("qrcode", { qrImage, qrUrl }); 
    } catch (error) {
        console.error("QR Code yaratishda xatolik:", error);
        res.status(500).send("Xatolik yuz berdi");
    }
};
