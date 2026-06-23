import Navbar from "@/components/layout/Navbar";
import CheckoutClient from "@/components/store/CheckoutClient";

export const metadata = {
  title: "Finalizar compra",
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <span
              className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Checkout
            </span>
            <h1
              className="text-white uppercase leading-none mt-3"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px,6vw,72px)", letterSpacing: "0.02em" }}
            >
              Finalizar{" "}
              <span style={{ WebkitTextStroke: "1.5px #D4AF37", color: "transparent" }}>Compra</span>
            </h1>
          </div>
          <CheckoutClient />
        </div>
      </main>
    </>
  );
}
