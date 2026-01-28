const frases = [
  "Bom dia. Vá no seu ritmo.",
  "Respire. Um passo de cada vez.",
  "Você está indo bem.",
  "A calma também é força.",
  "Não há pressa. Continue.",
  "Estou com você.",
  "Hoje já é suficiente."
];

export async function GET() {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  return Response.json({ frase });
}
