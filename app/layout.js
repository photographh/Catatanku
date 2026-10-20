import "./globals.css";

export const metadata = {
  title: "Catatan CRUD",
  description: "CRUD sederhana: Next.js App Router + MySQL (Aiven)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <main className="wrap">{children}</main>
      </body>
    </html>
  );
}
