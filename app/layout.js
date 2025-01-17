import "tailwindcss/tailwind.css";

export const metadata = {
  title: "Notas",
  description: "Crie e compartilhe notas temporárias seguras.",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className="bg-gradient-to-br from-purple-900 to-black min-h-screen text-white">
              {children}
          </body>
      </html>
  );
}
