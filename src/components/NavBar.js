import { useState } from 'react';
import '../styles/NavBar.css'

const NavBar = (props) =>{
    // Guarda qual seção está ativa (começa com 'home')
    const [activeSection, setActiveSection] = useState('home');

    const handleNavClick = (id) => {
        // 1. Atualiza o estado da seção ativa
        setActiveSection(id);

        // 2. Executa a rolagem até a seção
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <div className="navBar" tabIndex={0}>
            <span 
                className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
            >
                <span className="dot"></span>
                Home
            </span>

            <span 
                className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => handleNavClick('projects')}
            >
                <span className="dot"></span>
                Projects
            </span>

            <span 
                className={`nav-item ${activeSection === 'contacts' ? 'active' : ''}`}
                onClick={() => handleNavClick('contacts')}
            >
                <span className="dot"></span>
                Contact
            </span>
        </div>
    )
}

export default NavBar;