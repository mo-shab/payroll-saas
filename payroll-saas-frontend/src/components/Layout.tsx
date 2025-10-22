import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 w-full">
      {/* Fixed Header - stays at top */}
      <Header />

      {/* Main Content Area - scrollable, with padding-top to account for fixed header */}
      <main className="flex-grow pt-16 w-full">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
