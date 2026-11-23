import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../../styles/ProjectsStyle.css';

const GITHUB_URL = 'https://github.com/igorpaixaoo';

const projects = [
    {
        name: 'iBank',
        description: 'A bank simulation ...',
        image: './projects/ibank.png',
        status: 'in-progress',
        techs: ['React', 'Node.js', 'MySQL', 'Java', 'Spring Framework', "JWT", "API restFul", 'Docker'],
        repo: GITHUB_URL + '/ibank',
        live: null,
    },
    {
        name: 'passo-certo',
        description: 'This is an application designed to help the elderly understand and use technological tools.',
        image: '',
        status: 'in-progress',
        techs: ['ReactNative', 'Node.js', 'Expo', 'MySQL', 'Kotlin'],
        repo: GITHUB_URL + '/ibank',
        live: null,
    },
    {
        name: 'ptnclima',
        description: 'A project that consumes a REST weather API, specifically for the city of Presidente Tancredo Neves (my hometown).',
        image: './projects/ptnclima.png',
        status: 'completed',
        techs: ['JavaScript', 'axios', "HTML/CSS"],
        repo: GITHUB_URL + '/ptnclima',
        live: 'https://ptnclima.netlify.app/',
    },
    {
        name: 'API Restful auth',
        description: 'A user authentication project (login/registration).',
        image: null,
        status: 'in-progress',
        techs: ['Java', 'Spring Framework', 'MySQL'],
        repo: GITHUB_URL + 'https://github.com/igorpaixaoo/api-system-login',
        live: null
    }
];

const STATUS_LABEL = {
    'completed': 'Completed',
    'in-progress': 'In progress',
};

const ProjectCard = ({ project }) => (
    <article className="project-card">
        <div className="project-image">
            {project.image ? (
                <img src={project.image} alt={`Screenshot of ${project.name}`} />
            ) : (
                <span className="project-image-placeholder">{project.name.charAt(0)}</span>
            )}
        </div>

        <div className="project-body">
            <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <span className={`project-status ${project.status}`}>
                    <span className="status-dot" />
                    {STATUS_LABEL[project.status]}
                </span>
            </div>

            <p className="project-description">{project.description}</p>

            <ul className="project-techs">
                {project.techs.map((tech) => (
                    <li key={tech}>{tech}</li>
                ))}
            </ul>

            <div className="project-actions">
                {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer" className="project-btn">
                        <FaGithub /> Repository
                    </a>
                )}
                {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="project-btn primary">
                        <FaExternalLinkAlt /> Live project
                    </a>
                )}
            </div>
        </div>
    </article>
);

const Projects = () => {
    return (
        <section id="projects" className="section projects-section">
            <h2 className="section-title">
                My <span className="accent">work</span>
            </h2>

            <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </div>

            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="more-projects">
                More projects on <FaGithub className="more-projects-icon" />
            </a>
        </section>
    );
};

export default Projects;
