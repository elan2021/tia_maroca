import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySearch from "@/components/CategorySearch";
import ProductShowcase from "@/components/ProductShowcase";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-container-max mx-auto pb-24 md:pb-12">
        <Hero />
        <CategorySearch />
        <ProductShowcase />
        <Newsletter />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
