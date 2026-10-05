import React, { useEffect, useRef, useState } from 'react';

// --- Configuración del juego (fácil de ajustar) ---
const RINGS = [16, 38, 57, 76, 95];       // radios de los anillos, del centro hacia afuera
const RING_POINTS = [50, 25, 15, 10, 5];  // puntos según en qué anillo cae la flecha
const START_ARROWS = 8;                   // flechas disponibles por partida
const ANCHOR = { x: 90, y: 380 };         // posición del arco dentro del SVG
const TARGET = { x: 850, y: 220 };        // posición de la diana dentro del SVG

const BullseyeGame = () => {
  // Referencias a los elementos SVG que vamos a mover "a mano" con JS,
  // sin pasar por el ciclo de renderizado de React (más simple para animar).
  const boardRef = useRef(null);
  const svgRef = useRef(null);
  const guideRef = useRef(null);
  const bowStringRef = useRef(null);
  const flyingArrowRef = useRef(null);
  const stuckArrowsRef = useRef(null);
  const bannerRef = useRef(null);

  // Estado "de verdad" de React: solo lo que necesita repintar la pantalla
  // (marcador, flechas restantes, pantalla de fin de juego).
  const [score, setScore] = useState(0);
  const [arrowsLeft, setArrowsLeft] = useState(START_ARROWS);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalMsg, setFinalMsg] = useState('');

  // Copias en useRef del mismo estado, para poder leerlas dentro de los
  // event listeners sin que queden "atrapadas" con valores viejos (closures).
  const scoreRef = useRef(0);
  const arrowsLeftRef = useRef(START_ARROWS);
  const streakRef = useRef(0);
  const bestRef = useRef(0);
  const draggingRef = useRef(false);
  const animatingRef = useRef(false);

  useEffect(() => {
    const svg = svgRef.current;
    const board = boardRef.current;
    let mounted = true;

    const svgPoint = (evt) => {
      const rect = svg.getBoundingClientRect();
      const x = ((evt.clientX - rect.left) / rect.width) * 1000;
      const y = ((evt.clientY - rect.top) / rect.height) * 500;
      return { x, y };
    };

    const drawString = (pull) => {
      const localX = pull.x - ANCHOR.x;
      const localY = pull.y - ANCHOR.y;
      bowStringRef.current.setAttribute(
        'points',
        `-20,-95 ${localX.toFixed(1)},${localY.toFixed(1)} -20,95`
      );
    };

    const resetString = () => {
      bowStringRef.current.setAttribute('points', '-20,-95 -20,95');
    };

    const showBanner = (hit, points) => {
      const banner = bannerRef.current;
      banner.classList.remove('bg-hit', 'bg-miss', 'bg-show', 'bg-hide');
      banner.textContent = hit ? (points >= 50 ? '¡DIANA!' : 'HIT!') : 'MISS!';
      banner.classList.add(hit ? 'bg-hit' : 'bg-miss');
      void banner.offsetWidth; // fuerza a reiniciar la animación CSS
      banner.classList.add('bg-show');
      setTimeout(() => {
        banner.classList.remove('bg-show');
        banner.classList.add('bg-hide');
      }, 700);
    };

    const stickArrow = (x, y) => {
      const angle = -20 + Math.random() * 40; // pequeña variación para que no queden todas iguales
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${x},${y}) rotate(${angle})`);
      g.innerHTML = `
        <line x1="-30" y1="0" x2="4" y2="0" stroke="#c9c9c9" stroke-width="4" stroke-linecap="round"></line>
        <path d="M -30 0 L -14 -8 L -14 0 Z" fill="#7ec850"></path>
        <path d="M -30 0 L -14 8 L -14 0 Z" fill="#5c9d3a"></path>
      `;
      stuckArrowsRef.current.appendChild(g);
    };

    const animateArrow = (x1, y1, x2, y2, duration, done) => {
      const flyingArrow = flyingArrowRef.current;
      flyingArrow.setAttribute('visibility', 'visible');
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
      const start = performance.now();

      const frame = (now) => {
        if (!mounted) return;
        const t = Math.min((now - start) / duration, 1);
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        flyingArrow.setAttribute('transform', `translate(${x},${y}) rotate(${angle})`);
        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          flyingArrow.setAttribute('visibility', 'hidden');
          done();
        }
      };
      requestAnimationFrame(frame);
    };

    const resolveShot = (x, y) => {
      const dist = Math.hypot(x - TARGET.x, y - TARGET.y);
      const hit = dist <= RINGS[RINGS.length - 1];
      let points = 0;

      if (hit) {
        for (let i = 0; i < RINGS.length; i++) {
          if (dist <= RINGS[i]) {
            points = RING_POINTS[i];
            break;
          }
        }
        scoreRef.current += points;
        streakRef.current += 1;
        bestRef.current = Math.max(bestRef.current, streakRef.current);
        stickArrow(x, y);
        showBanner(true, points);
      } else {
        streakRef.current = 0;
        showBanner(false, 0);
      }

      setScore(scoreRef.current);
      setStreak(streakRef.current);
      animatingRef.current = false;

      if (arrowsLeftRef.current <= 0) {
        setTimeout(() => {
          setFinalMsg(
            `Terminaste con ${scoreRef.current} puntos y una racha máxima de ${bestRef.current}.`
          );
          setGameOver(true);
        }, 900);
      }
    };

    const shoot = (dx, dy, pullDist) => {
      const shootDir = { x: -dx, y: -dy };
      const norm = Math.hypot(shootDir.x, shootDir.y) || 1;
      const dirX = shootDir.x / norm;
      const dirY = shootDir.y / norm;

      // más estirado = más potencia = más precisión
      const power = Math.min(pullDist / 230, 1);
      const inaccuracy = (1 - power) * 0.09;
      const jitter = (Math.random() * 2 - 1) * inaccuracy;
      const cosJ = Math.cos(jitter);
      const sinJ = Math.sin(jitter);
      const fdx = dirX * cosJ - dirY * sinJ;
      const fdy = dirX * sinJ + dirY * cosJ;

      const t = (TARGET.x - ANCHOR.x) / fdx;
      const landX = TARGET.x;
      const landY = ANCHOR.y + fdy * t;

      const travel = Math.hypot(landX - ANCHOR.x, landY - ANCHOR.y);
      const duration = Math.max(260, Math.min(650, travel * (0.85 - power * 0.3)));

      animatingRef.current = true;
      arrowsLeftRef.current -= 1;
      setArrowsLeft(arrowsLeftRef.current);

      animateArrow(ANCHOR.x, ANCHOR.y, landX, landY, duration, () => {
        resolveShot(landX, landY);
      });
    };

    const onDown = (evt) => {
      if (animatingRef.current || arrowsLeftRef.current <= 0) return;
      draggingRef.current = true;
      board.classList.add('bg-dragging');
      board.setPointerCapture(evt.pointerId);
      onMove(evt);
    };

    const onMove = (evt) => {
      if (!draggingRef.current) return;
      const p = svgPoint(evt);
      let dx = p.x - ANCHOR.x;
      let dy = p.y - ANCHOR.y;
      const dist = Math.min(Math.hypot(dx, dy), 230);
      const ang = Math.atan2(dy, dx);
      dx = Math.cos(ang) * dist;
      dy = Math.sin(ang) * dist;

      drawString({ x: ANCHOR.x + dx, y: ANCHOR.y + dy });

      // solo mostramos la guía si el arrastre apunta "hacia atrás" (disparo válido)
      if (dx < -15) {
        const shootDir = { x: -dx, y: -dy };
        const far = 1400;
        const norm = Math.hypot(shootDir.x, shootDir.y) || 1;
        const ex = ANCHOR.x + (shootDir.x / norm) * far;
        const ey = ANCHOR.y + (shootDir.y / norm) * far;
        guideRef.current.setAttribute('x1', ANCHOR.x);
        guideRef.current.setAttribute('y1', ANCHOR.y);
        guideRef.current.setAttribute('x2', ex);
        guideRef.current.setAttribute('y2', ey);
        guideRef.current.setAttribute('opacity', '0.5');
      } else {
        guideRef.current.setAttribute('opacity', '0');
      }
    };

    const onUp = (evt) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      board.classList.remove('bg-dragging');
      guideRef.current.setAttribute('opacity', '0');

      const p = svgPoint(evt);
      const dx = p.x - ANCHOR.x;
      const dy = p.y - ANCHOR.y;
      const dist = Math.min(Math.hypot(dx, dy), 230);
      resetString();

      if (dx > -20 || dist < 25) return; // no se estiró lo suficiente / dirección inválida

      shoot(dx, dy, dist);
    };

    board.addEventListener('pointerdown', onDown);
    board.addEventListener('pointermove', onMove);
    board.addEventListener('pointerup', onUp);
    board.addEventListener('pointercancel', onUp);

    return () => {
      mounted = false;
      board.removeEventListener('pointerdown', onDown);
      board.removeEventListener('pointermove', onMove);
      board.removeEventListener('pointerup', onUp);
      board.removeEventListener('pointercancel', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reiniciar = () => {
    scoreRef.current = 0;
    arrowsLeftRef.current = START_ARROWS;
    streakRef.current = 0;
    bestRef.current = 0;
    setScore(0);
    setArrowsLeft(START_ARROWS);
    setStreak(0);
    setGameOver(false);
    if (stuckArrowsRef.current) stuckArrowsRef.current.innerHTML = '';
  };

  return (
    <div className="bg-wrap">
      {/* Estilos propios del juego, con prefijo "bg-" para no chocar con el resto de App.css */}
      <style>{`
        .bg-wrap { max-width: 640px; margin: 0 auto; }
        .bg-topbar {
          display: flex; justify-content: space-between; align-items: center;
          gap: 10px; margin-bottom: 8px; flex-wrap: wrap;
        }
        .bg-stat {
          background: #26262d; border: 1px solid #3a3a42; border-radius: 8px;
          padding: 6px 12px; text-align: center; min-width: 64px;
        }
        .bg-stat .bg-num { font-weight: 700; font-size: 18px; color: #f2f2f2; display: block; }
        .bg-stat .bg-label { font-size: 10px; color: #9a9aa3; }
        .bg-board {
          position: relative; width: 100%; aspect-ratio: 1000 / 500;
          background: radial-gradient(120% 140% at 15% 85%, #232329 0%, #1b1b1f 60%);
          border-radius: 10px; overflow: hidden; touch-action: none; cursor: grab;
        }
        .bg-board.bg-dragging { cursor: grabbing; }
        .bg-board svg { width: 100%; height: 100%; display: block; }
        .bg-hint { font-size: 13px; color: #6c6c74; margin-top: 8px; }
        .bg-banner {
          position: absolute; top: 14%; left: 50%;
          transform: translate(-50%, -10px) scale(.7);
          font-weight: 800; font-size: clamp(24px, 6vw, 40px);
          opacity: 0; pointer-events: none; white-space: nowrap;
          transition: transform .28s cubic-bezier(.2,1.6,.4,1), opacity .28s ease;
        }
        .bg-banner.bg-show { opacity: 1; transform: translate(-50%, 0) scale(1); }
        .bg-banner.bg-hide {
          opacity: 0; transform: translate(-50%, -6px) scale(.9);
          transition: transform .35s ease, opacity .35s ease;
        }
        .bg-banner.bg-hit { color: #f2c14e; }
        .bg-banner.bg-miss { color: #9a9aa3; }
        .bg-overlay {
          position: absolute; inset: 0; background: rgba(15,15,18,.9);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 12px; text-align: center; padding: 20px; color: #f2f2f2;
        }
        .bg-overlay h4 { color: #f2c14e; margin: 0; }
        .bg-overlay p { color: #9a9aa3; margin: 0; max-width: 280px; }
        .bg-btn {
          background: #f2c14e; color: #1b1b1f; border: none; border-radius: 8px;
          padding: 8px 16px; font-weight: 600; cursor: pointer;
        }
      `}</style>

      <div className="bg-topbar">
        <div className="bg-stat"><span className="bg-num">{score}</span><span className="bg-label">PUNTOS</span></div>
        <div className="bg-stat"><span className="bg-num">{arrowsLeft}</span><span className="bg-label">FLECHAS</span></div>
        <div className="bg-stat"><span className="bg-num">{streak}</span><span className="bg-label">RACHA</span></div>
        <button className="bg-btn" onClick={reiniciar} type="button">Reiniciar</button>
      </div>

      <div className="bg-board" ref={boardRef}>
        <svg ref={svgRef} viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={TARGET.x} cy={TARGET.y} r="180" fill="url(#bgGlow)" />

          <line ref={guideRef} x1="0" y1="0" x2="0" y2="0" stroke="#f2c14e" strokeWidth="2" strokeDasharray="6 8" opacity="0" />

          {/* Diana */}
          <g>
            <circle cx={TARGET.x} cy={TARGET.y} r="95" fill="#f4f4f4" />
            <circle cx={TARGET.x} cy={TARGET.y} r="76" fill="#d64545" />
            <circle cx={TARGET.x} cy={TARGET.y} r="57" fill="#f4f4f4" />
            <circle cx={TARGET.x} cy={TARGET.y} r="38" fill="#d64545" />
            <circle cx={TARGET.x} cy={TARGET.y} r="16" fill="#f2c14e" stroke="#b5860a" strokeWidth="2" />
          </g>

          {/* Acá se van agregando las flechas que quedan clavadas */}
          <g ref={stuckArrowsRef}></g>

          {/* Arco */}
          <g transform={`translate(${ANCHOR.x},${ANCHOR.y})`}>
            <path d="M -20 -95 Q 42 0 -20 95" fill="none" stroke="#5c9d3a" strokeWidth="10" strokeLinecap="round" />
            <polyline ref={bowStringRef} points="-20,-95 -20,95" stroke="#e8e8e8" strokeWidth="2" fill="none" />
          </g>

          {/* Flecha en vuelo */}
          <g ref={flyingArrowRef} visibility="hidden">
            <line x1="-34" y1="0" x2="34" y2="0" stroke="#c9c9c9" strokeWidth="4" strokeLinecap="round" />
            <path d="M 34 0 L 22 -7 L 22 7 Z" fill="#c9c9c9" />
            <path d="M -34 0 L -18 -9 L -18 -1 Z" fill="#7ec850" />
            <path d="M -34 0 L -18 9 L -18 1 Z" fill="#5c9d3a" />
          </g>
        </svg>

        <div className="bg-banner" ref={bannerRef}>HIT!</div>

        {gameOver && (
          <div className="bg-overlay">
            <h4>Juego terminado</h4>
            <p>{finalMsg}</p>
            <button className="bg-btn" onClick={reiniciar} type="button">Jugar de nuevo</button>
          </div>
        )}
      </div>

      <p className="bg-hint">
        Hacé clic (o tocá) sobre el arco, arrastrá hacia atrás para tensar y soltá para disparar.
      </p>
    </div>
  );
};

export default BullseyeGame;