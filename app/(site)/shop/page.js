import { getProducts } from "../../../lib/store";
import ShopGrid from "../../../components/ShopGrid";

export const dynamic = "force-dynamic";
export const metadata = { title: "Shop | Flav’Ds Beauty World" };

export default async function Shop({ searchParams }) {
  const products = await getProducts();
  return (
    <main className="section">
      <div className="wrap">
        <h1 className="page-h">Shop</h1>
        <p className="muted page-sub">Tap any product to order it on WhatsApp.</p>
        <ShopGrid products={products} initialCat={searchParams?.cat} />
      </div>
    </main>
  );
}
