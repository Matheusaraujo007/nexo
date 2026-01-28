"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Clique para ativar o Nexo");

  const speak = msg => {
    const u = new SpeechSynthesisUtterance(msg);
    u.lang = "pt-BR";
    u.rate = 0.8;
    u.pitch = 0.85;
    speechSynthesis.speak(u);
  };

  const iniciarNexo = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const rec = new SR();
    rec.lang = "pt-BR";
    rec.continuous = true;

    rec.onstart = () => {
      setStatus("🎙️ Nexo ouvindo...");
      speak("Nexo ativo. Estou ouvindo.");
    };

    rec.onresult = e => {
      const texto =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      console.log("Ouvi:", texto);

      if (texto.includes("ok nexo")) {
        speak("Estou aqui. Pode falar.");
        setStatus("Nexo respondeu.");
      }
    };

    rec.onerror = e => {
      console.error(e);
      setStatus("Erro ao ouvir.");
    };

    rec.start();
  };

  return (
    <main style={{ padding: 30 }}>
      <h1>🤖 NEXO</h1>
      <p>{status}</p>

      <button onClick={iniciarNexo}>
        Ativar Nexo
      </button>

      <p style={{ marginTop: 20 }}>
        Diga claramente: <b>“Ok Nexo”</b>
      </p>
    </main>
  );
}
