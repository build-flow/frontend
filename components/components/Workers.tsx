"use client";

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Workers.css';
import CreateWorker from '../CreateWorker';


function Workers() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newWorker, setNewWorker] = useState({
    name: '',
    role: '',
    contact: '',
    assignedUnits: '',
    status: 'Active',
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return (
    <div className="workers">
      <div className="workers-header">
        <h2 className="workers-title">Workers</h2>
        <button className="add-worker-btn" onClick={openModal}>
          Add Worker
        </button>
      </div>

      {/* Modal for Adding a Worker */}
      <CreateWorker closeModal={closeModal} shown={modalIsOpen} />
      
      <table className="workers-table">
        <thead>
          <tr>
            <th>Worker Name</th>
            <th>Role</th>
            <th>Contact</th>
            <th>Assigned Units</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <tr key={index}>
              <td>{worker.name}</td>
              <td>{worker.role}</td>
              <td>{worker.contact}</td>
              <td>{worker.assignedUnits}</td>
              <td>
                <span
                  className={`status ${
                    worker.status === 'Active' ? 'active' : 'inactive'
                  }`}
                >
                  {worker.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workers;