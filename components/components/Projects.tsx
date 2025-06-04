import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../api/api';
import { FaBuilding } from 'react-icons/fa';
import './Projects.css';

function Projects() {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [inProgressProjects, setInProgressProjects] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.data.success) {
          setCompletedProjects(response.data.data.completed || []);
          setInProgressProjects(response.data.data.in_progress || []);
        } else {
          setError(response.data.message || 'Failed to load projects.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load projects.');
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    if (completedProjects.some((p) => p.id === project.id)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="projects">
      <h2 className="projects-title">Projects</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="projects-section">
        <h3 className="section-title">Completed Projects</h3>
        <div className="projects-list">
          {completedProjects.length > 0 ? (
            completedProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleProjectClick(project)}
              >
                <FaBuilding className="project-icon" />
                <p>{project.name}</p>
              </div>
            ))
          ) : (
            <p>No completed projects available.</p>
          )}
        </div>
      </div>
      <div className="projects-section">
        <h3 className="section-title">Projects in Progress</h3>
        <div className="projects-list">
          {inProgressProjects.length > 0 ? (
            inProgressProjects.map((project) => (
              <div key={project.id} className="project-card">
                <FaBuilding className="project-icon" />
                <p>{project.name}</p>
              </div>
            ))
          ) : (
            <p>No projects in progress.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;