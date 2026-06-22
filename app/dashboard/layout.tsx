import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Mi cuenta — Barber Shop Pro",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </>
  );
}
