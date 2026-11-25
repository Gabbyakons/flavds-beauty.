export const SHOP = {
  name: "Flav’Ds Beauty World",
  tagline: "Your One Stop Shop",
  whatsapp: "2347070105798", // 07070105798 in international format
  phoneDisplay: "0707 010 5798",
  address: "Shop 7 Waziri Plaza, beside Fittamas Pharmacy, Km26 Keffi-Abuja Expressway, Auta Balefi, Karu, Nasarawa State",
  delivery: "Free delivery to Bingham University",
};

export const CATEGORIES = ["Wigs", "Braiding Hair", "Relaxers", "Hair Care"];

export const naira = (n) => "₦" + Number(n).toLocaleString("en-NG");

export const waLink = (text) =>
  `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;

export const orderLink = (p) =>
  waLink(`Hello Flav’Ds Beauty World, I want to order:\n${p.name} - ${naira(p.price)}\n\nIs it available?`);

export const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Waziri Plaza, Auta Balefi, Karu, Nasarawa State");
