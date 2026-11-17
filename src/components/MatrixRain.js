import { useEffect, useRef } from 'react';
import '../styles/MatrixRainStyle.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=-<>/\\{}[]();:!?|^~';
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/*
  "Chuva" de letras, números e símbolos no estilo terminal hacker verde.
  - Se adapta ao tamanho do container (ResizeObserver)
  - Pausa quando sai da tela (IntersectionObserver) para não gastar CPU
  - Com "reduzir movimento" ativado no sistema, desenha um quadro estático
*/
const MatrixRain = ({
    color = '#00f5d0',
    headColor = '#ccfff6',
    background = '16, 16, 16',
    fontSize = 16,
    frameInterval = 55, // ms entre quadros (maior = mais lento)
}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let width = 0;
        let height = 0;
        let drops = [];
        let offsetX = 0;
        let frame = null;
        let lastTime = 0;
        let visible = true;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const columns = Math.floor(width / fontSize);
            // Centraliza a grade de colunas (sobra dividida igualmente nos dois lados)
            offsetX = (width - columns * fontSize) / 2;
            // Mantém as colunas existentes e começa as novas em alturas aleatórias
            drops = Array.from({ length: columns }, (_, i) =>
                drops[i] ?? Math.floor(Math.random() * -(height / fontSize))
            );

            ctx.fillStyle = `rgb(${background})`;
            ctx.fillRect(0, 0, width, height);
        };

        const draw = () => {
            // Véu semitransparente: cria o rastro que vai apagando
            ctx.fillStyle = `rgba(${background}, 0.12)`;
            ctx.fillRect(0, 0, width, height);
            ctx.font = `${fontSize}px "Courier New", monospace`;
            ctx.textBaseline = 'top';

            for (let i = 0; i < drops.length; i++) {
                const x = offsetX + i * fontSize;
                const y = drops[i] * fontSize;

                if (y >= 0) {
                    // Caractere logo acima da "cabeça" vira verde
                    ctx.fillStyle = color;
                    ctx.fillText(randomChar(), x, y - fontSize);
                    // Cabeça da coluna, mais clara
                    ctx.fillStyle = headColor;
                    ctx.fillText(randomChar(), x, y);
                }

                // Troca aleatória de um caractere já desenhado (efeito de "glitch")
                if (Math.random() < 0.02) {
                    ctx.fillStyle = color;
                    ctx.fillText(randomChar(), x, Math.floor(Math.random() * (height / fontSize)) * fontSize);
                }

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i]++;
                }
            }
        };

        const loop = (time) => {
            frame = requestAnimationFrame(loop);
            if (time - lastTime < frameInterval) return;
            lastTime = time;
            draw();
        };

        const start = () => {
            if (frame === null && visible && !reducedMotion) frame = requestAnimationFrame(loop);
        };
        const stop = () => {
            if (frame !== null) cancelAnimationFrame(frame);
            frame = null;
        };

        resize();
        if (reducedMotion) {
            for (let i = 0; i < 40; i++) draw();
        }

        const resizeObserver = new ResizeObserver(() => {
            resize();
            if (reducedMotion) for (let i = 0; i < 40; i++) draw();
        });
        resizeObserver.observe(container);

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            visible ? start() : stop();
        });
        intersectionObserver.observe(container);

        start();
        return () => {
            stop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, [color, headColor, background, fontSize, frameInterval]);

    return (
        <div className="matrix-rain" ref={containerRef} aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default MatrixRain;
