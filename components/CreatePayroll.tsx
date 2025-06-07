import { getCompanyWorkers } from '@/data/queries';
import { getCompanyId } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type props = {
  shown: boolean
  closeModal: () => void
}

const CreatePayroll = ({ shown, closeModal } : props) => {
    const companyId = getCompanyId();
    const { data: workers } = useQuery({
      queryKey: ['workers'],
      queryFn: () => getCompanyWorkers(companyId)
    });
  
  return shown && (
    <div className='inset-0 z-50 flex justify-center items-center fixed' onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <h2 className='text-xl font-bold py-4'>Create Payroll</h2>
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="workerName">Worker Name</label>
            <input
              type="text"
              id="workerName"
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
            <label htmlFor="hoursWorked">Hours Worked</label>
            <input
              type="number"
              id="hoursWorked"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ratePerHour">Rate per Hour</label>
            <input
              type="number"
              id="ratePerHour"
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalPay">Total Pay</label>
            <input
              type="number"
              id="totalPay"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button className="save-btn">
              Save
            </button>
            <button className="disburse-btn">
              Disburse
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

export default CreatePayroll;
