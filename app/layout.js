// app/layout.js
import "./globals.css";
import { Roboto, Sarina } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "./components/Providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});
const sarina = Sarina({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-brand",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} ${roboto.variable} ${sarina.variable} min-h-dvh flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}