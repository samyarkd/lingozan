import "~/styles/globals.css";

import { Inter } from "next/font/google";

import Header from "~/components/layout/Header";
import Providers from "~/components/providers";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lingozan 😃",
  description: "Learn a new language using the power of AI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("font-sans bg-background", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TRPCReactProvider>
            <Providers>
              <Header />
              <main className="min-h-[calc(100vh-50px)] flex flex-col py-10">
                {children}
              </main>
            </Providers>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
