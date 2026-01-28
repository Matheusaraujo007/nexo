"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Clique para ativar o Nexo");
  const [tasks, setTasks] = useState([]);
  const [hora, setHora] = useState("07:00");
  let recognition;

  const speak = msg => {
    const u = new SpeechSynthesisUtterance(msg);
    u.lang = "pt-BR";
    u.rate = 0.8;
    u.pitch = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  const carregarTarefas = async () => {
    const r = await fetch("/api/tasks");
    setTasks(await r.json());
  };

  const criarTarefa = async texto => {
    if (!texto) return;

    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ text: texto })
    });

    carregarTarefas();
    speak("Tarefa criada com calma.");
  };

  const iniciarNexo = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    recognition = new SR();
    recognition.lang = "pt-BR";
    recognition.continuous = true;

    recognition.onstart = () => {
      setStatus("🎙️ Nexo ouvindo...");
      speak("Nexo ativo. Estou ouvindo.");
    };

    recognition.onresult = e => {
      const texto =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      console.log("Ouvi:", texto);

      if (texto.includes("ok nexo")) {
        speak("Estou ouvindo.");

        if (texto.includes("criar tarefa")) {
          const tarefa = texto
            .replace("ok nexo", "")
            .replace("criar tarefa", "")
            .trim();

          criarTarefa(tarefa);
          setStatus("Tarefa registrada.");
        }

        if (texto.includes("bom dia")) {
          speak("Bom dia. Vá no seu ritmo. Estou aqui.");
        }
      }
    };

    recognition.onerror = () => {
      setStatus("Reconhecimento pausado.");
    };

    recognition.start();
  };

  const definirDespertar = () => {
    localStorage.setItem("horaDespertar", hora);
    speak(`Despertar definido para ${hora}. Estarei aqui.`);
    setStatus(`⏰ Despertar às ${hora}`);
  };

  useEffect(() => {
    carregarTarefas();
    const h = localStorage.getItem("horaDespertar");
    if (h) setHora(h);
  }, []);

  return (
    <main>
      <h1>🤖 NEXO</h1>

      <p className="status">{status}</p>

      <button onClick={iniciarNexo}>
        Ativar Nexo
      </button>

      <p className="hint">Diga: <b>“Ok Nexo”</b></p>

      <h3>📋 Tarefas</h3>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>

      <h3>⏰ Despertar</h3>
      <input
        type="time"
        value={hora}
        onChange={e => setHora(e.target.value)}
      />
      <button onClick={definirDespertar}>
        Definir horário
      </button>
    </main>
  );
}
