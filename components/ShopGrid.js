"use client";
import { useMemo, useState } from "react";
import { CATEGORIES, waLink } from "../lib/shop";
import ProductCard from "./ProductCard";

export default function ShopGrid({ products, initialCat }) {
  const [cat, setCat] = useState(CATEGORIES.includes(initialCat) ? initialCat : "All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => products.filter((p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase())),
    [products, cat, q]
  );

  return (
    <>
      <div className="toolbar">
        <div className="tabs" role="tablist" aria-label="Product categories">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "tab on" : "tab"} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <input type="search" placeholder="Search products" aria-label="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {list.length === 0 ? (
        <p className="empty">
          Nothing matches your search.{" "}
          <a href={waLink(`Hello, do you have ${q || "this product"}?`)} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>.
        </p>
      ) : (
        <ul className="grid">
          {list.map((p) => (
            <li key={p.id}><ProductCard p={p} /></li>
          ))}
        </ul>
      )}
    </>
  );
}
