import React, { useState } from 'react';
import Modal from 'react-modal';
import './Workers.css';

// Bind modal to the app element for accessibility
Modal.setAppElement('#root');

function Workers() {
  const [workers, setWorkers] = useState([
    {
      name: 'John Doe',
      role: 'Carpenter',
      contact: 'john.doe@example.com',
      assignedUnits: 'Unit 1, Unit 3',
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      role: 'Electrician',
      contact: 'jane.smith@example.com',
      assignedUnits: 'Unit 2',
      status: 'Inactive',
    },
    {
      name: 'Mike Johnson',
      role: 'Plumber',
      contact: 'mike.johnson@example.com',
      assignedUnits: 'Unit 4',
      status: 'Active',
    },
    {
      name: 'Sarah Williams',
      role: 'Painter',
      contact: 'sarah.williams@example.com',
      assignedUnits: 'Unit 1, Unit 2',
      status: 'Active',
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newWorker, setNewWorker] = useState({
    name: '',
    role: '',
    contact: '',
    assignedUnits: '',
    status: 'Active', // Default status
  });

  const openModal = () => {
    setModalIsOpen(true);
    setSuccessMessage(''); // Reset success message when opening modal
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewWorker({
      name: '',
      role: '',
      contact: '',
      assignedUnits: '',
      status: 'Active',
    }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker((prevWorker) => ({
      ...prevWorker,
      [name]: value,
    }));
  };

  const handleSaveWorker = () => {
    // Add the new worker to the workers list
    setWorkers((prevWorkers) => [...prevWorkers, newWorker]);
    setSuccessMessage('Saved successfully');
    setTimeout(() => {
      closeModal();
      setSuccessMessage('');
    }, 1000); // Close modal after 1 second
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Add New Worker</h2>
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Worker Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newWorker.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={newWorker.role}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={newWorker.contact}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="assignedUnits">Assigned Units</label>
            <input
              type="text"
              id="assignedUnits"
              name="assignedUnits"
              value={newWorker.assignedUnits}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={newWorker.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button className="save-btn" onClick={handleSaveWorker}>
              Save
            </button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </Modal>

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