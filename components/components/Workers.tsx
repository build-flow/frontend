"use client";

import { useState } from 'react';
import CreateWorker from '../CreateWorker';
import { Button } from '../ui/button';
import './Workers.css';
import { useQuery } from '@tanstack/react-query';
import { getCompanyWorkers } from '@/data/queries';
import { getCompanyId } from '@/lib/utils';


function Workers() {
  const companyId = getCompanyId();
  const { data: workers } = useQuery({
    queryKey: ['workers'],
    queryFn: () => getCompanyWorkers(companyId)
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        <Button className="add-worker-btn" onClick={openModal}>
          Add Worker
        </Button>
      </div>

      {/* Modal for Adding a Worker */}
      <CreateWorker
        closeModal={closeModal}
        shown={modalIsOpen}
      />

      <table className="workers-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Wage</th>
            <th>Rate</th>
            <th>ID Number</th>
          </tr>
        </thead>
        <tbody>
          {workers?.map((worker, index) => (
            <tr key={index}>
              <td>{worker?.first_name}</td>
              <td>{worker?.last_name}</td>
              <td>{worker?.phone_number}</td>
              <td>{worker?.wage}</td>
              <td>{worker?.rate}</td>
              <td>{worker?.id_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workers;