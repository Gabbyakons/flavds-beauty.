import "./globals.css";
import { Fraunces, Outfit } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["600", "800"] });
const body = Outfit({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Flav’Ds Beauty World | Wigs, Braiding Hair & Hair Products",
  description: "Human hair wigs, braiding hair and hair products in Karu, Nasarawa State. Order on WhatsApp. Free delivery to Bingham University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
