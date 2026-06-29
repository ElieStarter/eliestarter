const fs = require("fs");
const path = require("path");

function getSize(dirPath) {
  let total = 0;

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      total += getSize(fullPath);
    } else {
      total += stats.size;
    }
  }

  return total;
}

// ---- EXECUTION ----
const target = process.argv[2] || ".";

const bytes = getSize(target);
const mb = bytes / (1024 * 1024);
const gb = bytes / (1024 * 1024 * 1024);

console.log("📦 Taille du projet");
console.log(`Bytes: ${bytes}`);
console.log(`MB: ${mb.toFixed(2)} Mo`);
console.log(`GB: ${gb.toFixed(2)} Go`);