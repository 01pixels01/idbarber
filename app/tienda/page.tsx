import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StoreClient from "@/components/store/StoreClient";
import CartDrawer from "@/components/store/CartDrawer";

export const metadata = {
  title: "Tienda Premium",
  description: "Productos premium para tu cabello y barba. Pomadas, aceites, shampoos y accesorios profesionales. Los mismos que usan nuestros barberos.",
  openGraph: {
    title: "Tienda Premium — IDBARBER",
    description: "Pomadas, aceites, shampoos y accesorios profesionales. Envío a todo Colombia.",
  },
};

export default function TiendaPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen pb-20 bg-[#080808]">
        {/* Header */}
        <div className="flex flex-col items-center text-center px-4" style={{ paddingTop: "170px", paddingBottom: "64px" }}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)" }}>
            <span style={{ color: "#D4AF37", fontFamily: "var(--font-barlow)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Tienda Online
            </span>
          </div>
          <h1
            className="uppercase leading-none mb-5"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px,8vw,100px)", letterSpacing: "0.02em", color: "#FFFFFF" }}
          >
            PRODUCTOS{" "}
            <span style={{ WebkitTextStroke: "1.5px #D4AF37", color: "transparent" }}>PREMIUM</span>
          </h1>
          <p
            className="max-w-xl mx-auto"
            style={{ color: "#999999", fontFamily: "var(--font-barlow)", fontWeight: 300, fontSize: "clamp(15px,1.6vw,19px)", lineHeight: 1.7 }}
          >
            Los mismos productos que usan nuestros barberos. Cuida tu imagen en casa como un profesional.
          </p>
        </div>

        <StoreClient />
      </main>
      <Footer />
    </>
  );
}
