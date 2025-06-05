import React from 'react';

type props = {
  closeModal: () => void
  shown: boolean
}

const CreateWorker = ({ closeModal, shown } : props) => {
  return shown && (
    <div
      onClick={closeModal}
      className='flex justify-center items-center fixed inset-0 z-50'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-lg shadow-lg p-8 min-w-[320px] w-full max-w-md max-h-[90vh] overflow-auto'
      >
        <h2>Add New Worker</h2>
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Worker Name</label>
            <input
              type="text"
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
            />
          </div>
          <div className="form-group">
            <label htmlFor="assignedUnits">Assigned Units</label>
            <input
              type="text"
              id="assignedUnits"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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

export default CreateWorker;
