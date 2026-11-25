import fs from "fs/promises";
import path from "path";
import { CATEGORIES } from "./shop";

const DIR = path.join(process.cwd(), "data");
const FILE = path.join(DIR, "products.json");
export const UPLOAD_DIR = path.join(DIR, "uploads");

export async function getProducts() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function save(list) {
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
}

// Returns a clean product object or null if the input is invalid
export function clean(input) {
  const name = String(input?.name ?? "").trim().slice(0, 120);
  const price = Number(input?.price);
  const category = String(input?.category ?? "");
  const image = String(input?.image ?? "");
  if (!name || !Number.isFinite(price) || price < 0) return null;
  if (!CATEGORIES.includes(category)) return null;
  if (image && !image.startsWith("/api/uploads/") && !/^https?:\/\//.test(image)) return null;
  return { name, price: Math.round(price), category, image, inStock: input?.inStock !== false };
}

export async function removeUpload(url) {
  if (typeof url === "string" && url.startsWith("/api/uploads/")) {
    await fs.unlink(path.join(UPLOAD_DIR, path.basename(url))).catch(() => {});
  }
}

export async function addProduct(data) {
  const list = await getProducts();
  const item = { id: Math.max(0, ...list.map((p) => p.id)) + 1, ...data };
  list.push(item);
  await save(list);
  return item;
}

export async function updateProduct(id, data) {
  const list = await getProducts();
  const i = list.findIndex((p) => p.id === id);
  if (i < 0) return null;
  if (list[i].image && list[i].image !== data.image) await removeUpload(list[i].image);
  list[i] = { id, ...data };
  await save(list);
  return list[i];
}

export async function deleteProduct(id) {
  const list = await getProducts();
  const item = list.find((p) => p.id === id);
  if (!item) return false;
  await removeUpload(item.image);
  await save(list.filter((p) => p.id !== id));
  return true;
}
