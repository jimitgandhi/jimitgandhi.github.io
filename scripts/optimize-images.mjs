// Converts source images in assets/source into optimized WebP files in public/images.
// Run with: npm run images
import sharp from "sharp";
import { mkdirSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";

const SRC = "assets/source";
const OUT = "public/images";

const presets = {
  logo: { width: 240, height: 240, fit: "inside", quality: 90 },
  project: { width: 1280, fit: "inside", quality: 76 },
  portrait: { width: 800, fit: "inside", quality: 80 },
  avatar: { width: 320, height: 320, fit: "cover", quality: 85 },
};

const pick = (name) => {
  if (name.startsWith("project-")) return presets.project;
  if (["pikkal", "speridian", "studysid", "iiit", "logo"].includes(name)) return presets.logo;
  if (name === "avatar") return presets.avatar;
  return presets.portrait;
};

mkdirSync(OUT, { recursive: true });

for (const file of readdirSync(SRC)) {
  const name = basename(file, extname(file));
  const { quality, ...resize } = pick(name);
  const dest = join(OUT, `${name}.webp`);
  const info = await sharp(join(SRC, file))
    .rotate()
    .resize({ ...resize, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(dest);
  console.log(`${dest}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}
