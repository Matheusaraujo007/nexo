"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Clique para ativar o Nexo");
  let recognition;

  const speak = msg => {
    const u = new SpeechSynthesisUtterance(msg);
    u.lang = "pt-BR";
    u.rate = 0.8;
    u.pitch = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  const iniciarNexo = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      alert("Reconhecimento de voz não suportado neste navegador.");
      return;
    }

    recognition = new SR();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setStatus("🎙️ Nexo ouvindo...");
      speak("Nexo ativo. Estou ouvindo.");
    };

    recognition.onresult = e => {
      const texto =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      console.log("Ouvi:", texto);

      if (texto.includes("ok nexo")) {
        speak("Estou aqui. Pode falar.");
        setStatus("Comando reconhecido.");
      }
    };

    recognition.onerror = e => {
      console.warn("Erro de voz:", e.error);
      setStatus("Reconhecimento pausado. Clique para reativar.");
      recognition.stop();
    };

    recognition.onend = () => {
      setStatus("Nexo em espera.");
    };

    recognition.start();
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
