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
      <body>
        <Navbar />
        {children}
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}