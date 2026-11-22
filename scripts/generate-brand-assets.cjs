/**
 * Génère les visuels de marque à partir du logo et de la photo d'accueil :
 *   app/icon.png (onglet), app/apple-icon.png (écran d'accueil iOS), app/favicon.ico,
 *   public/logo/logo-mark-light.png et public/images/og-photo.jpg (utilisés par app/opengraph-image.tsx)
 * Exécuter : npm run brand:assets
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const LOGO = path.join(root, "public", "logo", "logo-agora.png");
const OUT = path.join(root, "app");
const PLUM = "#35203a";

/** Le symbole occupe le haut du logo, au-dessus du mot AGORA. */
async function extractMark() {
  const { width } = await sharp(LOGO).metadata();
  const top = await sharp(LOGO).extract({ left: 0, top: 3, width, height: 59 }).png().toBuffer();
  const mark = await sharp(top).trim({ threshold: 1 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  // Version inversée : la caméra (prune) passe en crème pour rester visible sur le fond prune.
  const { data, info } = mark;
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (data[i + 3] > 0 && lum < 110) {
      data[i] = 245;
      data[i + 1] = 236;
      data[i + 2] = 220;
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

async function square(mark, size, markRatio, radius) {
  const m = await sharp(mark).resize({ width: Math.round(size * markRatio), kernel: "lanczos3" }).toBuffer();
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${PLUM}"/></svg>`,
  );
  return sharp(bg).composite([{ input: m, gravity: "center" }]).png({ compressionLevel: 9 }).toBuffer();
}

/** Fichier .ico contenant plusieurs PNG (format accepté par tous les navigateurs actuels). */
function toIco(pngs, sizes) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const dirs = sizes.map((size, i) => {
    const d = Buffer.alloc(16);
    d.writeUInt8(size, 0);
    d.writeUInt8(size, 1);
    d.writeUInt16LE(1, 4);
    d.writeUInt16LE(32, 6);
    d.writeUInt32LE(pngs[i].length, 8);
    d.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return d;
  });
  return Buffer.concat([header, ...dirs, ...pngs]);
}

(async () => {
  const mark = await extractMark();
  // Symbole clair seul, réutilisé par l'image de partage (app/opengraph-image.tsx)
  fs.writeFileSync(
    path.join(root, "public", "logo", "logo-mark-light.png"),
    await sharp(mark).resize({ width: 440, kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer(),
  );
  // hero-main.jpg est en réalité un fichier AVIF : on en tire un vrai JPEG recadré pour l'image de partage.
  await sharp(path.join(root, "public", "images", "hero-main.jpg"))
    .resize({ width: 520, height: 630, fit: "cover", position: "attention" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(root, "public", "images", "og-photo.jpg"));
  fs.writeFileSync(path.join(OUT, "icon.png"), await square(mark, 192, 0.82, 192 * 0.22));
  fs.writeFileSync(path.join(OUT, "apple-icon.png"), await square(mark, 180, 0.78, 0));
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((size) => square(mark, size, 0.88, size * 0.2)));
  fs.writeFileSync(path.join(OUT, "favicon.ico"), toIco(pngs, sizes));
  console.log("Visuels générés : app/icon.png, app/apple-icon.png, app/favicon.ico, public/logo/logo-mark-light.png, public/images/og-photo.jpg");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
