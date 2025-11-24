import Carousel from "@/components/Carousel";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const images = [
    "/1.JPEG",
    "/2.JPEG",
    "/3.JPEG",
    "/4.JPEG",
    "/5.JPEG",
    "/6.JPEG",
    "/7.JPEG",
    "/8.JPEG",
  ];

  const [tempo, setTempo] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    // 🔥 DATA INICIAL EXATA: 1 ano + 360 dias atrás
    const dataInicial = new Date();
    dataInicial.setFullYear(dataInicial.getFullYear() - 1); // menos 1 ano
    dataInicial.setDate(dataInicial.getDate() - 360); // menos 360 dias

    const atualizar = () => {
      const agora = new Date();

      // Diferença total em milissegundos
      let diff = agora - dataInicial;

      // Converter para menores unidades
      let segundos = Math.floor(diff / 1000);
      let minutos = Math.floor(segundos / 60);
      let horas = Math.floor(minutos / 60);
      let diasTotais = Math.floor(horas / 24);

      segundos %= 60;
      minutos %= 60;
      horas %= 24;

      // Cálculo de anos e meses baseado em calendário real
      let anos = agora.getFullYear() - dataInicial.getFullYear();
      let meses = agora.getMonth() - dataInicial.getMonth();
      let dias = agora.getDate() - dataInicial.getDate();

      if (dias < 0) {
        // Pega dias do mês anterior
        const diasNoMesAnterior = new Date(
          agora.getFullYear(),
          agora.getMonth(),
          0
        ).getDate();
        dias += diasNoMesAnterior;
        meses--;
      }

      if (meses < 0) {
        meses += 12;
        anos--;
      }

      setTempo({
        anos,
        meses,
        dias,
        horas,
        minutos,
        segundos,
      });
    };

    atualizar();
    const interval = setInterval(atualizar, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.iframe}>
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/0ysTJCguBamXVvxwR1BNzE?utm_source=generator"
          width="100%"
          height="80"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
      <Carousel images={images} />
      <div className={styles.bottomContainer}>
        <p className={styles.title}>Eu te amo há:</p>
        <div className={styles.square}>
          <span>
            {tempo.anos} anos, {tempo.meses} meses, {tempo.dias} dias,{" "}
            {tempo.horas} horas, {tempo.minutos} minutos e {tempo.segundos}{" "}
            segundos
          </span>
        </div>
        <p className={styles.text}>
          “O amor que sinto por você não cabe em palavras, mas ainda assim
          transborda em cada letra que tento escrever. Você é o tipo de presença
          que ilumina sem esforço, que acalma sem pedir, que transforma sem
          perceber. Desde que você entrou na minha vida, tudo ganhou um novo
          significado — os dias ficaram mais leves, os sonhos mais possíveis e o
          mundo, de alguma forma, mais bonito. Eu te honro, te admiro e te
          agradeço por existir, por ser exatamente quem é, por tocar minha vida
          de um jeito tão profundo que até o tempo parece respeitar. Se amar é
          encontrar um lar no coração de alguém, então eu já encontrei o meu em
          você.”
        </p>
      </div>
    </div>
  );
}
