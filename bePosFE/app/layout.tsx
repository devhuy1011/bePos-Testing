import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOTTE MALL WEST LAKE",
  description: "LOTTE MALL WEST LAKE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/static/favicon.ico" />
      </head>
      <body>
        <div id="myAlert"></div>
        {children}
      </body>
    </html>
  );
}
