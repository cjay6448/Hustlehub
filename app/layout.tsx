import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

export const metadata: Metadata = {
  title: "HustleHub.ca — Canadian Personal Finance in Plain English",
  description: "Government benefits, tax credits, and money guides written for real Canadians. Free, independent, no ads.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <script dangerouslySetInnerHTML={{ __html: `
  (function() {
    try {
      var saved = localStorage.getItem('hh-theme');
      if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch(e) {}
  })();
`}} />
      <body>
        <Navbar />
        {children}
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}