import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.ignaciovroveres.com.ar"),
  title: {
    default: "Ignacio Roveres — Full Stack Developer",
    template: "%s — Ignacio Roveres",
  },
  description:
    "Portfolio de Ignacio Roveres, desarrollador Full Stack especializado en React y Node.js. Proyectos, skills y blog sobre desarrollo web.",
  openGraph: {
    title: "Ignacio Roveres — Full Stack Developer",
    description:
      "Desarrollador Full Stack. Construyo interfaces y sistemas que funcionan de verdad.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignacio Roveres — Full Stack Developer",
    description:
      "Desarrollador Full Stack. Construyo interfaces y sistemas que funcionan de verdad.",
  },
};

export const viewport = {
  themeColor: "#030508",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${jetbrainsMono.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
