import React from 'react';
import '../styles/CarouselTechsStyle.css';

import LogoAWS from '../util/aws.svg';
import LogoCSharp from '../util/csharp.svg';
import LogoCss from '../util/css.svg';
import LogoGit from '../util/git.svg';
import LogoHtml from '../util/html.svg';
import LogoJS from '../util/js.svg';
import LogoMysql from '../util/mysql.svg';
import LogoNodejs from '../util/nodejs.svg';
import LogoPostgres from '../util/postgres.svg';
import LogoReact from '../util/react.svg';
import LogoSpring from '../util/spring.svg';
import LogoJava from '../util/java.svg';
import LogoDocker from '../util/docker.svg';

const techs = [
    { name: 'AWS', logo: LogoAWS },
    { name: 'C#', logo: LogoCSharp },
    { name: 'HTML5', logo: LogoHtml },
    { name: 'CSS3', logo: LogoCss },
    { name: 'GIT', logo: LogoGit },
    { name: 'JavaScript', logo: LogoJS },
    { name: 'MySQL', logo: LogoMysql },
    { name: 'PostgreSQL', logo: LogoPostgres },
    { name: 'Node.js', logo: LogoNodejs },
    { name: 'React', logo: LogoReact },
    { name: 'Java', logo: LogoJava },
    { name: 'Spring Boot', logo: LogoSpring },
    { name: 'Docker', logo: LogoDocker }
];

const CarouselTechs = () => {
    const doubleTechs = [...techs, ...techs];

    return (
        <div className="carousel-container">
            <div className="carousel-track">
                {doubleTechs.map((tech, index) => (
                    <div className="tech-card" key={index}>
                        <img src={tech.logo} className="tech-icon" />
                        <span className="tech-name">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselTechs;