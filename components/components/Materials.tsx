"use client";

import { useState } from 'react';
import CreateMaterial from '../CreateMaterial';
import './Materials.css';

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

function Materials() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    quantity: '',
    unitPrice: '',
    totalCost: '',
    status: 'In Stock', // Default status
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewMaterial({
      name: '',
      quantity: '',
      unitPrice: '',
      totalCost: '',
      status: 'In Stock',
    });
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
      />

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