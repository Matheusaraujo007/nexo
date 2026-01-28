let tasks = [];

export async function GET() {
  return Response.json(tasks);
}

export async function POST(req) {
  const { text } = await req.json();
  tasks.push({ id: Date.now(), text });
  return Response.json({ ok: true });
}
