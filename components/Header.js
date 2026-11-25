import Link from "next/link";
import { SHOP, waLink } from "../lib/shop";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="brand">
          Flav’Ds <span>Beauty World</span>
        </Link>
        <nav aria-label="Main">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/#visit">Visit us</Link>
        </nav>
        <a className="btn btn-wa small" href={waLink(`Hello ${SHOP.name}, I want to make an enquiry.`)} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>
    </header>
  );
}
