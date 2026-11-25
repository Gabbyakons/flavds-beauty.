import { naira, orderLink } from "../lib/shop";

export default function ProductCard({ p }) {
  const initials = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <a className="pcard" href={orderLink(p)} target="_blank" rel="noopener noreferrer" aria-label={`Order ${p.name} on WhatsApp`}>
      <div className="pimg">
        {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <span className="ph">{initials}</span>}
        {!p.inStock && <span className="badge">Out of stock</span>}
      </div>
      <div className="pbody">
        <span className="cat">{p.category}</span>
        <span className="pname">{p.name}</span>
        <div className="prow">
          <span className="price">{naira(p.price)}</span>
          <span className="order">Order</span>
        </div>
      </div>
    </a>
  );
}
