import "./globals.css";

export const metadata = {
  title: "Nexo",
  description: "Assistente pessoal calmo e inteligente"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
