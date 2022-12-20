import Drawer from "../components/drawer";
import "./globals.css";
import Header from "./header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="fantasy">
      <head />
      <body>
        <Header />
        <Drawer />
        <main>{children}</main>
      </body>
    </html>
  );
}
