import { getClients } from "@/lib/admin";
import ClientesTable from "@/components/admin/ClientesTable";

export const dynamic = "force-dynamic";

export default async function ClientesPage() {
  const clients = await getClients();
  return <ClientesTable clients={clients} />;
}
