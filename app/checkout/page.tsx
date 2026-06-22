import Navbar from "@/components/layout/Navbar";
import CheckoutClient from "@/components/store/CheckoutClient";

export const metadata = {
  title: "Checkout — Barber Shop Pro",
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-3xl font-bold text-white mb-8">Finalizar compra</h1>
          <CheckoutClient />
        </div>
      </main>
    </>
  );
}
