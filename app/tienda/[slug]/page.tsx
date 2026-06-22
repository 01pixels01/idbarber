import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import ProductDetail from "@/components/store/ProductDetail";
import { getProductBySlug, products } from "@/lib/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Barber Shop Pro`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
