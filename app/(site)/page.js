import Link from "next/link";
import { getProducts } from "../../lib/store";
import { CATEGORIES, SHOP, mapsLink, waLink } from "../../lib/shop";
import ProductCard from "../../components/ProductCard";

export const dynamic = "force-dynamic";

const BLURB = {
  Wigs: "Human hair and premium wigs",
  "Braiding Hair": "Braids, twists and curls",
  Relaxers: "Relaxers and cream relaxers",
  "Hair Care": "Oils, creams, shampoo and more",
};

export default async function Home() {
  const products = await getProducts();
  const newest = [...products].reverse();
  const featured = newest.slice(0, 8);
  const heroImgs = newest.filter((p) => p.image).slice(0, 3);
  const count = (c) => products.filter((p) => p.category === c).length;

  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">{SHOP.tagline} in Karu, Nasarawa State</p>
            <h1>Wigs, braids and hair care, delivered.</h1>
            <p className="lead">
              Human hair wigs, braiding hair and hair products from brands you know.
              Pick what you like and order in one tap on WhatsApp.
            </p>
            <div className="actions">
              <Link href="/shop" className="btn btn-gold">Shop all products</Link>
              <a className="btn btn-line" href={waLink(`Hello ${SHOP.name}, I want to make an enquiry.`)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
            <p className="note">{SHOP.delivery}</p>
          </div>
          <div className={heroImgs.length ? "hero-art has-img" : "hero-art"} aria-hidden={heroImgs.length ? undefined : "true"}>
            {heroImgs.length ? (
              heroImgs.map((p, i) => <img key={p.id} src={p.image} alt={p.name} className={`ha ha${i}`} />)
            ) : (
              <span className="mono">F</span>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Shop by category</h2>
          <ul className="cats">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link href={`/shop?cat=${encodeURIComponent(c)}`} className="cat-tile">
                  <span className="cat-name">{c}</span>
                  <span className="muted">{BLURB[c]}</span>
                  <span className="cat-count">{count(c)} items</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="head-row">
            <h2>New in the shop</h2>
            <Link href="/shop" className="link">See all products</Link>
          </div>
          <ul className="grid">
            {featured.map((p) => (
              <li key={p.id}><ProductCard p={p} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap why">
          <div>
            <h3>Free delivery to Bingham University</h3>
            <p className="muted">Students at Bingham get their order brought to them at no extra cost.</p>
          </div>
          <div>
            <h3>Order in one tap</h3>
            <p className="muted">Tap a product and your order message is ready in WhatsApp. Just press send.</p>
          </div>
          <div>
            <h3>Brands you trust</h3>
            <p className="muted">X-Pression, Lush, Darling, Petals, Beva, Above and more, all in one shop.</p>
          </div>
        </div>
      </section>

      <section className="section alt" id="visit">
        <div className="wrap visit">
          <div>
            <h2>Visit the shop</h2>
            <p className="lead">{SHOP.address}</p>
            <p><a href={`tel:+${SHOP.whatsapp}`} className="link">Call {SHOP.phoneDisplay}</a></p>
          </div>
          <div className="actions">
            <a className="btn btn-gold" href={mapsLink} target="_blank" rel="noopener noreferrer">Get directions</a>
            <a className="btn btn-wa" href={waLink(`Hello ${SHOP.name}, I want to make an enquiry.`)} target="_blank" rel="noopener noreferrer">Message us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
