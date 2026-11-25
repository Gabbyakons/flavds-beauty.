import { redirect } from "next/navigation";
import { isAdmin } from "../../lib/auth";
import { getProducts } from "../../lib/store";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin | Flav’Ds Beauty World" };

export default async function AdminPage() {
  if (!isAdmin()) redirect("/admin/login");
  return <Dashboard initial={await getProducts()} />;
}
