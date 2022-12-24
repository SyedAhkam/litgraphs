import "./globals.css";
import Header from "./header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head />
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
