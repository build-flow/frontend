"use client";

import { getCompanyWorkers } from '@/data/queries';
import { getCompanyId } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

type Worker = {
  id_number: string;
  first_name: string;
  role: string;
  wage: string;
  rate: string
  payment_channel: string;
  phone_number: string
};

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

    const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
    const [step, setStep] = useState<'select' | 'confirm'>('select');

    const handleWorkerToggle = (workerId: string) => {
      setSelectedWorkers(prev => 
        prev.includes(workerId) 
          ? prev.filter(id => id !== workerId)
          : [...prev, workerId]
      );
    };

    const handleSelectAll = () => {
      if (selectedWorkers.length === workers.length) {
        setSelectedWorkers([]);
      } else {
        setSelectedWorkers(workers.map((worker: Worker) => worker.id_number));
      }
    };

    const handleConfirm = () => {
      if (selectedWorkers.length > 0) {
        setStep('confirm');
      }
    };

    const handleBack = () => {
      setStep('select');
    };

    const handleDisburse = () => {
      // Handle disbursement logic here
      console.log('Disbursing payroll for workers:', selectedWorkers);
      closeModal();
    };

    const getSelectedWorkersData = () => {
      return workers.filter((worker: Worker) => selectedWorkers.includes(worker.id_number));
    };

    const resetAndClose = () => {
      setStep('select');
      setSelectedWorkers([]);
      closeModal();
    };
  
  return shown && (
    <div className='inset-0 z-50 flex justify-center items-center fixed' onClick={resetAndClose}>
      <div className='bg-white rounded-lg shadow-lg p-8 min-w-[320px] w-full max-w-2xl max-h-[90vh] overflow-auto' onClick={(e) => e.stopPropagation()}>
        <h2 className='text-xl font-bold py-4'>Create Payroll</h2>
        
        {step === 'select' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Select Workers</h3>
              <button
                onClick={handleSelectAll}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {selectedWorkers.length === workers.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
              {workers.map((worker: Worker) => (
                <div key={worker.id_number} className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    id={`worker-${worker.id_number}`}
                    checked={selectedWorkers.includes(worker.id_number)}
                    onChange={() => handleWorkerToggle(worker.id_number)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`worker-${worker.id_number}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">{worker.first_name}</div>
                    <div className="text-sm text-gray-600">{worker.role}</div>
                  </label>
                </div>
              ))}
            </div>
            
            {workers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No workers found
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              <div className="text-sm text-gray-600">
                {selectedWorkers.length} worker(s) selected
              </div>
              <div className="space-x-2">
                <button 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={resetAndClose}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={selectedWorkers.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selected Workers</h3>
              <button
                onClick={handleBack}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                ← Back to Selection
              </button>
            </div>
            
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
              {getSelectedWorkersData().map((worker: Worker) => (
                <div key={worker.id_number} className="p-4 border-b border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium">{worker.first_name}</div>
                      <div className="text-sm text-gray-600">{worker.role}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <label className="text-xs text-gray-600 w-20">Hours:</label>
                        <input
                          type="number"
                          placeholder="0"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-xs text-gray-600 w-20">Rate:</label>
                        <input
                          type="number"
                          placeholder="0"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-4">
              <div className="text-sm text-gray-600">
                {selectedWorkers.length} worker(s) ready for payroll
              </div>
              <div className="space-x-2">
                <button 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={resetAndClose}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisburse}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Disburse Payroll
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePayroll;
