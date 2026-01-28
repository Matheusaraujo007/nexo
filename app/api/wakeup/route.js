const frases = [
  "Bom dia. Que hoje seja leve.",
  "Acorde com calma.",
  "Respire fundo. Estou aqui.",
  "Mais um dia. Sem pressa.",
  "Quando quiser, começamos."
];

export async function GET() {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  return Response.json({
    titulo: "🤖 Nexo",
    corpo: frase
  });
}
