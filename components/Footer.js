import Link from "next/link";
import { SHOP } from "../lib/shop";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div>
          <p className="brand">Flav’Ds <span>Beauty World</span></p>
          <p className="muted">{SHOP.tagline}. Luxury, quality and confidence.</p>
        </div>
        <div>
          <p className="foot-h">Shop</p>
          <p><Link href="/shop">All products</Link></p>
          <p><Link href="/shop?cat=Braiding%20Hair">Braiding hair</Link></p>
          <p><Link href="/shop?cat=Hair%20Care">Hair care</Link></p>
        </div>
        <div>
          <p className="foot-h">Contact</p>
          <p><a href={`tel:+${SHOP.whatsapp}`}>{SHOP.phoneDisplay}</a></p>
          <p className="muted">{SHOP.address}</p>
        </div>
      </div>
      <p className="copy wrap">© {new Date().getFullYear()} {SHOP.name}</p>
    </footer>
  );
}
