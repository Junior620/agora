/**
 * Génère un QR code PNG pointant vers le site en production.
 * Exécuter : npm run qr:site
 */
const path = require("path");
const QRCode = require("qrcode");

const SITE_URL = "https://agorafilminvest.com";
const out = path.join(__dirname, "..", "public", "qr-agorafilminvest.png");

QRCode.toFile(
  out,
  SITE_URL,
  {
    width: 512,
    margin: 2,
    color: { dark: "#000000", light: "#FFFFFF" },
    errorCorrectionLevel: "M",
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("QR enregistré :", out);
    console.log("URL encodée :", SITE_URL);
  }
);
