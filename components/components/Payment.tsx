"use client"

import React, { useState } from 'react';
import './Payment.css';
import CreatePayroll from '../CreatePayroll';
import { useQuery } from '@tanstack/react-query';
import { getPayments } from '@/data/queries';
import { useParams } from 'next/navigation';

function Payment() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const params = useParams();
  const projectId = params.projectId as string
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { data: payments } = useQuery({
    queryKey: ['payments'],
    queryFn: () => getPayments(projectId)
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
            <th>Phone Number</th>
            <th>Amount</th>
            <th>Channel</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(payments) && payments?.map((payment, index) => (
            <tr key={index}>
              <td>{payment.worker.first_name}</td>
              <td>{payment.worker.phone_number}</td>
              <td>KSH. {payment.amount}</td>
              <td>{payment.channel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;
