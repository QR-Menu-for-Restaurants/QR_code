import QRCode from 'qrcode';

export const generateQR = async (req, res) => {
    try {
        const qrUrl = "http://localhost:3000/register"; 
        const qrImage = await QRCode.toDataURL(qrUrl);

        res.render("qrcode", { qrImage, qrUrl }); 
    } catch (error) {
        console.error("QR Code yaratishda xatolik:", error);
        res.status(500).send("Xatolik yuz berdi");
    }
};
