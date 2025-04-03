import QRCode from 'qrcode';
import os from 'os';
import { PORT } from '../config/app.config.js';
import { BaseException } from '../exceptions/base.exception.js';

export const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return net.address;
};

export const generateQR = async (req, res,next) => {
    try {
        const localIp = getLocalIp();
        const qrUrl = `http://${localIp}:${PORT}/menu`; 
        const qrImage = await QRCode.toDataURL(qrUrl);

        res.render("qrcode", { qrImage, qrUrl }); 
    } catch (error) {
        next(new BaseException("invalid qrcode",500));
    }
};

