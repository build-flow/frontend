"use client"

import React, { useState } from 'react';
import './Payment.css';
import CreatePayroll from '../CreatePayroll';
import { useQuery } from '@tanstack/react-query';

function Payment() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { data: payments } = useQuery({
    queryKey: ['payments'],
  });

  return (
    <div className="payment">
      <div className="payment-header">
        <h2 className="payment-title">Payment</h2>
        <button className="create-payroll-btn" onClick={openModal}>
          Create Payroll
        </button>
      </div>

      {/* Modal for Creating a Payroll */}
      <CreatePayroll shown={modalIsOpen} closeModal={closeModal} />
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
          {Array.isArray(payments) && payments?.map((payment, index) => (
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