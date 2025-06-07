"use client";

import { getProjectMaterials } from '@/data/queries';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import CreateMaterial from '../CreateMaterial';
import './Materials.css';

function Materials() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const params = useParams();
  const projectId = params.projectId as string

  const { data: materials } = useQuery({
    queryKey: ['materials'],
    queryFn: () => getProjectMaterials(projectId)
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="materials">
      <div className="materials-header">
        <h2 className="materials-title">Materials</h2>
        <button className="add-material-btn" onClick={openModal}>
          Add Material
        </button>
      </div>

      {/* Modal for Adding a Material */}
      <CreateMaterial
        closeModal={closeModal}
        shown={modalIsOpen}
        projectId={projectId}
      />

      <table className="materials-table">
        <thead>
          <tr>
            <th>Material Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(materials) && materials?.map((material, index) => (
            <tr key={index}>
              <td>{material.name}</td>
              <td>{material.quantity}</td>
              <td>KSH. {material.price}</td>
              <td>KSH. {material.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Materials;
