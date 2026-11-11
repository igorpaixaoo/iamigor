import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../../styles/HomeStyle.css';

import CarouselTechs from '../CarouselTechs';

const Home = () => {
    return (
        <section id="home" className="home-container">
            {/* Bloco principal: Texto de apresentação + Job */}
            <div className="hero-content">
                
                {/* Coluna da Esquerda: Saudação, Título e Ícones */}
                <div className="left-column">
                    <p className="whoIs">Hi, I'm Igor Paixão</p>

                    <h1 className="title">
                        Software<br />Developer
                    </h1>

                    <div className="medias">
                        <a href="https://github.com/igorpaixaoo" target="_blank" rel="noreferrer" className="media-btn">
                            <FaGithub size={25} />
                        </a>
                        <a href="https://www.linkedin.com/in/igorsp20/" target="_blank" rel="noreferrer" className="media-btn">
                            <FaLinkedin size={25} />
                        </a>
                        <a href="mailto:igorsanpaixao@gmail.com" className="media-btn">
                            <FaEnvelope size={25}/>
                        </a>
                    </div>
                </div>

                {/* Coluna da Direita: Descrição */}
                <div className="right-column">
                    <h3 className="description">
                        Transforming ideas into interactive and seamless digital experiences with cutting-edge <span className="purple-text">frontend</span> development.
                    </h3>
                </div>

            </div>

            <div className="technologies">
                <CarouselTechs/>
            </div>

            <div className="whatIDo">
                <h1>What I do?</h1>
            </div>
        </section>
    );
};

export default Home;