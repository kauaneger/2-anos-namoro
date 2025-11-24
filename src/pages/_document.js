import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "falling-heart";
      heart.innerText = "❤️";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = (Math.random() * 20 + 10) + "px";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 4000);
    }

    setInterval(createHeart, 300);
  `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
