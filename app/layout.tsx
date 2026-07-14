import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro, Montserrat, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const vietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-vietnam",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-membros-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-membros-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tia Maroka | Atividades Pedagógicas com Amor",
  description:
    "Recursos pedagógicos criados com carinho para transformar a educação infantil em um momento de alegria e descoberta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${vietnamPro.variable} ${montserrat.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body-md text-on-background scribble-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
