#!/usr/bin/env node
// Генерация Pro-ключа для покупателя.
//   node tools/keygen.js buyer@example.com
// Секрет ДОЛЖЕН совпадать с licenseSecret в site/config.js.
const crypto = require("crypto");
const SECRET = process.env.LISTAI_SECRET || "listai-change-me-2026";
const email = (process.argv[2] || "").trim().toLowerCase();
if (!email) { console.error("Использование: node tools/keygen.js email@example.com"); process.exit(1); }
const hex = crypto.createHash("sha256").update(email + ":" + SECRET).digest("hex").slice(0, 16).toUpperCase();
console.log(hex.match(/.{4}/g).join("-"));
