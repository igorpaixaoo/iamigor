import { useState } from 'react';
import { FaServer, FaLaptopCode, FaChevronDown } from 'react-icons/fa';
import '../styles/WhatIDoStyle.css';

const servicesData = [
    {
        id: 'backend',
        title: 'Backend Development',
        icon: <FaServer size={22} className="service-icon" />,
        items: [
            'RESTful APIs & Microservices Architecture (Java / Spring Boot & Node.js)',
            'Relational Database Modeling & Optimization (PostgreSQL / MySQL)',
            'Authentication, Security & Cloud Deployment (Docker / AWS EC2)'
        ]
    },
    {
        id: 'web',
        title: 'Web Development',
        icon: <FaLaptopCode size={22} className="service-icon" />,
        items: [
            'Single Page Applications (SPAs) with React',
            'Responsive & Modern User Interfaces (HTML5, CSS3, JavaScript)',
            'Full-Stack Integration & Interactive Web Tools'
        ]
    }
];

const WhatIDo = () => {
    const [openId, setOpenId] = useState(null);

    const toggleCard = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="what-i-do-container">
            {servicesData.map((service) => {
                const isOpen = openId === service.id;

                return (
                    <div 
                        key={service.id} 
                        id={service.id}
                        className={`service-card ${isOpen ? 'open' : ''}`}
                        onClick={() => toggleCard(service.id)}
                    >
                        <div className="service-header">
                            <div className="service-title-group">
                                {service.icon}
                                <h2 className="service-title">{service.title}</h2>
                            </div>
                            <FaChevronDown className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
                        </div>

                        <div className={`service-content-wrapper ${isOpen ? 'expanded' : ''}`}>
                            <div className="service-content">
                                <ul className="service-list">
                                    {service.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WhatIDo;