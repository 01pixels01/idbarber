import { getAgendaAppointments } from "@/lib/admin";
import AgendaCalendar from "@/components/admin/AgendaCalendar";

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  const appointments = await getAgendaAppointments();
  return <AgendaCalendar appointments={appointments} />;
}
