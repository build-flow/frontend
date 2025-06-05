import React from 'react';

type props = {
  closeModal: () => void
  shown: boolean
}

const CreateMaterial = ({ closeModal, shown } : props) => {
  return (
    <div
      className='flex justify-center items-center fixed inset-0 z-50'
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-lg shadow-lg p-8 min-w-[320px] w-full max-w-md max-h-[90vh] overflow-auto'
      >
        <h2>Add New Material</h2>
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Material Name</label>
            <input
              type="text"
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
              type="number"
              id="unitPrice"
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalCost">Total Cost</label>
            <input
              type="number"
              id="totalCost"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button className="save-btn">
              Save
            </button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMaterial;
