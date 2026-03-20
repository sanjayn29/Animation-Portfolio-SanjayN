import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId = 0;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1, overwrite: true });
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const listeners: Array<{
      element: HTMLElement;
      onMouseOver: (e: MouseEvent) => void;
      onMouseOut: () => void;
    }> = [];

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;

      const onMouseOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          gsap.to(cursor, {
            x: rect.left + 5,
            y: rect.top + 5,
            duration: 0.1,
            overwrite: true,
          });
          cursor.style.setProperty("--cursorH", `${Math.max(rect.height - 10, 14)}px`);
          cursor.style.setProperty("--cursorW", `${Math.max(rect.width - 10, 14)}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const onMouseOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);
      listeners.push({ element, onMouseOver, onMouseOut });
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      listeners.forEach(({ element, onMouseOver, onMouseOut }) => {
        element.removeEventListener("mouseover", onMouseOver);
        element.removeEventListener("mouseout", onMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;