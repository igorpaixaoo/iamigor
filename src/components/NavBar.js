import { useState } from 'react';
import '../styles/NavBar.css'

const NavBar = (props) =>{
    const [activeSection, setActiveSection] = useState('home');

    const handleNavClick = (id) => {
        setActiveSection(id);

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

            <span className={`nav-item ${activeSection === 'contacts' ? 'active' : ''}`} 
                onClick={() => handleNavClick('contacts')}
            >
                <span className="dot"></span>
                Contact
            </span>
        </div>
    )
}

export default NavBar;