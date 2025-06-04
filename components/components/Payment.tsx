import React, { useState } from 'react';
import Modal from 'react-modal';
import './Payment.css';

// Bind modal to the app element for accessibility
Modal.setAppElement('#root');

function Payment() {
  const [payments, setPayments] = useState([
    {
      workerName: 'John Doe',
      role: 'Carpenter',
      hoursWorked: 40,
      ratePerHour: 20,
      totalPay: 800,
      status: 'Paid',
    },
    {
      workerName: 'Jane Smith',
      role: 'Electrician',
      hoursWorked: 35,
      ratePerHour: 25,
      totalPay: 875,
      status: 'Pending',
    },
    {
      workerName: 'Mike Johnson',
      role: 'Plumber',
      hoursWorked: 45,
      ratePerHour: 22,
      totalPay: 990,
      status: 'Paid',
    },
    {
      workerName: 'Sarah Williams',
      role: 'Painter',
      hoursWorked: 30,
      ratePerHour: 18,
      totalPay: 540,
      status: 'Pending',
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newPayment, setNewPayment] = useState({
    workerName: '',
    role: '',
    hoursWorked: '',
    ratePerHour: '',
    totalPay: '',
    status: 'Pending', // Default status
  });

  const openModal = () => {
    setModalIsOpen(true);
    setSuccessMessage(''); // Reset success message when opening modal
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewPayment({
      workerName: '',
      role: '',
      hoursWorked: '',
      ratePerHour: '',
      totalPay: '',
      status: 'Pending',
    }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prevPayment) => {
      const updatedPayment = { ...prevPayment, [name]: value };
      // Calculate total pay if hoursWorked or ratePerHour changes
      if (name === 'hoursWorked' || name === 'ratePerHour') {
        const hoursWorked = name === 'hoursWorked' ? value : prevPayment.hoursWorked;
        const ratePerHour = name === 'ratePerHour' ? value : prevPayment.ratePerHour;
        updatedPayment.totalPay = hoursWorked && ratePerHour ? hoursWorked * ratePerHour : '';
      }
      return updatedPayment;
    });
  };

  const handleSavePayment = () => {
    // Add the new payment to the payments list
    setPayments((prevPayments) => [...prevPayments, newPayment]);
    setSuccessMessage('Saved successfully');
    setTimeout(() => {
      closeModal();
      setSuccessMessage('');
    }, 1000); // Close modal after 1 second
  };

  const handleDisburse = () => {
    alert('Payroll disbursed!'); // Replace with your logic (e.g., update status to Paid)
  };

  return (
    <div className="payment">
      <div className="payment-header">
        <h2 className="payment-title">Payment</h2>
        <button className="create-payroll-btn" onClick={openModal}>
          Create Payroll
        </button>
      </div>

      {/* Modal for Creating a Payroll */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Create Payroll</h2>
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="workerName">Worker Name</label>
            <input
              type="text"
              id="workerName"
              name="workerName"
              value={newPayment.workerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={newPayment.role}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hoursWorked">Hours Worked</label>
            <input
              type="number"
              id="hoursWorked"
              name="hoursWorked"
              value={newPayment.hoursWorked}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ratePerHour">Rate per Hour</label>
            <input
              type="number"
              id="ratePerHour"
              name="ratePerHour"
              value={newPayment.ratePerHour}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalPay">Total Pay</label>
            <input
              type="number"
              id="totalPay"
              name="totalPay"
              value={newPayment.totalPay}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={newPayment.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button className="save-btn" onClick={handleSavePayment}>
              Save
            </button>
            <button className="disburse-btn" onClick={handleDisburse}>
              Disburse
            </button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </Modal>

      <table className="payment-table">
        <thead>
          <tr>
            <th>Worker Name</th>
            <th>Role</th>
            <th>Hours Worked</th>
            <th>Rate per Hour</th>
            <th>Total Pay</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.workerName}</td>
              <td>{payment.role}</td>
              <td>{payment.hoursWorked}</td>
              <td>${payment.ratePerHour}</td>
              <td>${payment.totalPay}</td>
              <td>
                <span
                  className={`status ${
                    payment.status === 'Paid' ? 'paid' : 'pending'
                  }`}
                >
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;