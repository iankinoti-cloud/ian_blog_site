import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--cream)]">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
