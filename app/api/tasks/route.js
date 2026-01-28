let tasks = [];

export async function GET() {
  return Response.json(tasks);
}

export async function POST(req) {
  const { text } = await req.json();

  if (!text) {
    return Response.json({ error: "Texto vazio" }, { status: 400 });
  }

  tasks.push({
    id: Date.now(),
    text
  });

  return Response.json({ ok: true });
}
