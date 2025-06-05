"use client";

import { getCompanyProjects } from '@/data/queries';
import { getCompanyId, getToken } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBuilding, FaPlus } from 'react-icons/fa';
import CreateProject from '../CreateProject';
import { Button } from '../ui/button';
import './Projects.css';

function Projects() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const token = getToken();
  const companyId = getCompanyId();

  useEffect(() => {
    if (!token) {
      router.push('/auth/signin')
    }
  }, [token]);

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getCompanyProjects(companyId)
  });

  useEffect(() => {
    console.log("Projects: ", projects)
  }, [projects])

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
        <h3 className="section-title">Projects</h3>
        <div className="projects-list">
          {projects?.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => router.push(`/app/project/${project.id}`)}
              >
                <FaBuilding className="project-icon" />
                <p>{project.name}</p>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Projects;