"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [log, setLog] = useState("Nexo iniciando...");
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const speak = msg => {
    const u = new SpeechSynthesisUtterance(msg);
    u.lang = "pt-BR";
    u.rate = 0.8;
    u.pitch = 0.85;
    speechSynthesis.speak(u);
  };

  const loadTasks = async () => {
    const r = await fetch("/api/tasks");
    setTasks(await r.json());
  };

  const addTask = async t => {
    if (!t) return;
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ text: t })
    });
    speak("Tarefa registrada.");
    loadTasks();
  };

  const motivacao = async () => {
    const r = await fetch("/api/motivation");
    const d = await r.json();
    speak(d.frase);
    setLog(d.frase);
  };

  useEffect(() => {
    speak("Nexo online. Estou aqui com você.");
    loadTasks();

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.lang = "pt-BR";
    rec.continuous = true;

    rec.onresult = e => {
      const t =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      if (t.includes("ok nexo")) {
        speak("Estou ouvindo.");
        setLog("Nexo ativo.");

        if (t.includes("motivação")) motivacao();
        if (t.includes("tarefa")) {
          const tarefa = t.replace("ok nexo", "").replace("tarefa", "");
          addTask(tarefa.trim());
        }
      }
    };

    rec.start();
  }, []);

  return (
    <main>
      <h1>🤖 NEXO</h1>
      <p>{log}</p>

      <button onClick={motivacao}>Mensagem calma</button>

      <h3>Tarefas</h3>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={() => addTask(text)}>Adicionar</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>

      <p>Diga: <b>“Ok Nexo”</b></p>
    </main>
  );
}
