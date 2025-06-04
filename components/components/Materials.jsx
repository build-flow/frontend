import React, { useState } from 'react';
import Modal from 'react-modal';
import './Materials.css';

// Bind modal to the app element for accessibility
Modal.setAppElement('#root');

function Materials() {
  const [materials, setMaterials] = useState([
    {
      name: 'Cement',
      quantity: 50,
      unitPrice: 10,
      totalCost: 500,
      status: 'In Stock',
    },
    {
      name: 'Steel Bars',
      quantity: 20,
      unitPrice: 25,
      totalCost: 500,
      status: 'Out of Stock',
    },
    {
      name: 'Wood Planks',
      quantity: 100,
      unitPrice: 5,
      totalCost: 500,
      status: 'In Stock',
    },
    {
      name: 'Paint',
      quantity: 30,
      unitPrice: 15,
      totalCost: 450,
      status: 'In Stock',
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    quantity: '',
    unitPrice: '',
    totalCost: '',
    status: 'In Stock', // Default status
  });

  const openModal = () => {
    setModalIsOpen(true);
    setSuccessMessage(''); // Reset success message when opening modal
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewMaterial({
      name: '',
      quantity: '',
      unitPrice: '',
      totalCost: '',
      status: 'In Stock',
    }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial((prevMaterial) => {
      const updatedMaterial = { ...prevMaterial, [name]: value };
      // Calculate total cost if quantity or unitPrice changes
      if (name === 'quantity' || name === 'unitPrice') {
        const quantity = name === 'quantity' ? value : prevMaterial.quantity;
        const unitPrice = name === 'unitPrice' ? value : prevMaterial.unitPrice;
        updatedMaterial.totalCost = quantity && unitPrice ? quantity * unitPrice : '';
      }
      return updatedMaterial;
    });
  };

  const handleSaveMaterial = () => {
    // Add the new material to the materials list
    setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
    setSuccessMessage('Saved successfully');
    setTimeout(() => {
      closeModal();
      setSuccessMessage('');
    }, 1000); // Close modal after 1 second
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Add New Material</h2>
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Material Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newMaterial.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newMaterial.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              value={newMaterial.unitPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalCost">Total Cost</label>
            <input
              type="number"
              id="totalCost"
              name="totalCost"
              value={newMaterial.totalCost}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={newMaterial.status}
              onChange={handleInputChange}
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button className="save-btn" onClick={handleSaveMaterial}>
              Save
            </button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </Modal>

      <table className="materials-table">
        <thead>
          <tr>
            <th>Material Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Cost</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr key={index}>
              <td>{material.name}</td>
              <td>{material.quantity}</td>
              <td>${material.unitPrice}</td>
              <td>${material.totalCost}</td>
              <td>
                <span
                  className={`status ${
                    material.status === 'In Stock' ? 'in-stock' : 'out-of-stock'
                  }`}
                >
                  {material.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Materials;