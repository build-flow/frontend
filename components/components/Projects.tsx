"use client";

import React, { useState, useEffect } from 'react';
import { FaBuilding, FaPlus } from 'react-icons/fa';
import './Projects.css';
import { getToken } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import CreateProject from '../CreateProject';

function Projects() {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [inProgressProjects, setInProgressProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      router.push('/auth/signin')
    }
  }, [token]);

  return (
    <div className="p-10 max-w-[1200px]">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className='flex flex-col justify-center'>
      <div className='my-4 flex justify-center'>
        <Button className='flex items-center' onClick={() => setShowModal(true)}>
          Create Project
          <FaPlus />
        </Button>
      </div>
      <CreateProject
        shown={showModal}
        close={() => setShowModal(false)}
      />
      <div className="projects-section">
        <h3 className="section-title">Completed Projects</h3>
        <div className="projects-list">
          {completedProjects.length > 0 ? (
            completedProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
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
    </div>
  );
}

export default Projects;