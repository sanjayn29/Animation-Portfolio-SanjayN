import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    const clickHandlers = new Map<HTMLAnchorElement, (e: Event) => void>();

    links.forEach((element) => {
      const clickHandler = (e: Event) => {
        if (window.innerWidth <= 1024) return;

        e.preventDefault();
        const section = element.getAttribute("data-href");
        if (!section) return;

        const target = document.querySelector(section);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      clickHandlers.set(element, clickHandler);
      element.addEventListener("click", clickHandler);
    });

    const resizeHandler = () => ScrollTrigger.refresh();
    window.addEventListener("resize", resizeHandler);

    return () => {
      clickHandlers.forEach((handler, element) => {
        element.removeEventListener("click", handler);
      });
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          RC
        </a>
        <a
          href="mailto:rajeshchittyal21@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          rajeshchittyal21@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
