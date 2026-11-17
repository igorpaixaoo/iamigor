import { useEffect, useRef, useState } from 'react';
import '../styles/NavBar.css';

const links = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'contacts', label: 'Contact' },
];

// Uma seção vira a ativa quando o topo dela passa desta altura da tela
const ACTIVE_LINE = 0.4;
// A partir de quantos pixels de scroll a barra ganha o visual "focado"
const SCROLL_THRESHOLD = 10;

const NavBar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    // Durante o scroll suave disparado por um clique, o scroll-spy fica pausado
    // para a bolinha não "passar" pelas seções do meio.
    const lockUntilRef = useRef(0);

    // Scroll: atualiza a seção ativa
    useEffect(() => {
        let frame = null;

        const update = () => {
            frame = null;
            const y = window.scrollY;
            setScrolled(y > SCROLL_THRESHOLD);

            if (Date.now() < lockUntilRef.current) return;

            let current = links[0].id;
            const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 2;
            if (atBottom) {
                current = links[links.length - 1].id;
            } else {
                for (const link of links) {
                    const el = document.getElementById(link.id);
                    if (el && el.getBoundingClientRect().top <= window.innerHeight * ACTIVE_LINE) {
                        current = link.id;
                    }
                }
            }
            setActiveSection(current);
        };

        const onScroll = () => {
            if (frame === null) frame = requestAnimationFrame(update);
        };

        const onScrollEnd = () => {
            lockUntilRef.current = 0;
            onScroll();
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        window.addEventListener('scrollend', onScrollEnd);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            window.removeEventListener('scrollend', onScrollEnd);
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, []);

    // Fecha o menu (celular) ao clicar fora dele ou apertar Esc
    useEffect(() => {
        if (!menuOpen) return;

        const handlePointerDown = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
        };
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [menuOpen]);

    const handleNavClick = (id) => {
        setActiveSection(id);
        setMenuOpen(false);
        // Libera no evento "scrollend"; o tempo é só uma garantia para navegadores sem ele
        lockUntilRef.current = Date.now() + 1200;

        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            ref={navRef}
            className={`navBar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
            data-section={activeSection}
            tabIndex={0}
        >
            <button
                type="button"
                className="hamburger"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="nav-links"
                onClick={() => setMenuOpen((open) => !open)}
            >
                <span className="hamburger-bar" />
                <span className="hamburger-bar" />
                <span className="hamburger-bar" />
            </button>

            <div id="nav-links" className="nav-links">
                {links.map((link) => (
                    <button
                        key={link.id}
                        type="button"
                        className={`nav-item ${activeSection === link.id ? 'active' : ''}`}
                        aria-current={activeSection === link.id ? 'true' : undefined}
                        onClick={() => handleNavClick(link.id)}
                    >
                        <span className="dot"></span>
                        {link.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
