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
      <main className="min-h-screen pt-24 pb-16">
        {/* Header */}
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Tienda Online
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Productos <span className="text-gold-shimmer">premium</span>
          </h1>
          <p className="text-[#888888] text-lg max-w-xl mx-auto">
            Los mismos productos que usan nuestros barberos. Cuida tu imagen en casa como un profesional.
          </p>
        </div>

        <StoreClient />
      </main>
      <Footer />
    </>
  );
}
