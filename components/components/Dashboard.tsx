"use client";

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Dashboard.css';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProject } from '@/data/queries';

function Dashboard() {
  const params = useParams();
  const projectId = params.projectId as string

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId)
  });

  const [view, setView] = useState('calendar');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [newUnit, setNewUnit] = useState({
    name: '',
    type: '',
    startDate: '',
    endDate: '',
  });
  const [units, setUnits] = useState([]);

  const tasks = units.reduce((acc, unit) => {
    const start = new Date(unit.start_date);
    const end = new Date(unit.end_date);
    const month = start.toLocaleString('default', { month: 'long' });
    const existingMonth = acc.find((task) => task.month === month);

    const activity = {
      start: start.getDate(),
      end: end.getDate(),
      color: unit.status === 'Completed' ? '#00C4B4' : unit.status === 'In Progress' ? '#FFD700' : '#FF6347',
    };

    if (existingMonth) {
      existingMonth.activities.push(activity);
    } else {
      acc.push({ month, activities: [activity] });
    }

    return acc;
  }, []);

  const kanbanTasks = units.reduce(
    (acc, unit) => {
      const task = {
        name: unit.name,
        description: `Unit Type: ${unit.type}`,
        status: unit.status,
        statusColor:
          unit.status === 'Completed' ? '#00C4B4' : unit.status === 'In Progress' ? '#FFD700' : '#FF6347',
      };

      if (unit.status === 'Completed') {
        acc.done.push(task);
      } else if (unit.status === 'In Progress') {
        acc.inProgress.push(task);
      } else {
        acc.todo.push(task);
      }

      return acc;
    },
    { todo: [], inProgress: [], done: [] }
  );

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const openModal = () => {
    setModalIsOpen(true);
    setSuccessMessage('');
    setError('');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewUnit({ name: '', type: '', startDate: '', endDate: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUnit((prevUnit) => ({
      ...prevUnit,
      [name]: value,
    }));
  };

  const handleSaveUnit = async () => {
  };

  return (
    <div className="dashboard">
      <h2 className='capitalize text-2xl font-bold py-4'>{project?.name}</h2>
      <div className="dashboard-actions">
        <button className="add-unit-btn" onClick={openModal}>
          Add Unit
        </button>
        <div className="view-toggle">
          <button
            className={view === 'calendar' ? 'active' : ''}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
          <button
            className={view === 'unit' ? 'active' : ''}
            onClick={() => setView('unit')}
          >
            Unit View
          </button>
          <button
            className={view === 'kanban' ? 'active' : ''}
            onClick={() => setView('kanban')}
          >
            Kanban View
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Add New Unit</h2>
        <div className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Unit Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUnit.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Unit Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={newUnit.type}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={newUnit.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={newUnit.endDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-buttons">
            <button className="save-btn" onClick={handleSaveUnit}>
              Save
            </button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </Modal>

      {error && <p className="error-message">{error}</p>}

      {view === 'calendar' && (
        <div className="gantt-chart">
          <div className="gantt-header">
            <div className="gantt-label">20XX</div>
            {days.map((day) => (
              <div key={day} className="gantt-day">
                {day}
              </div>
            ))}
          </div>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={index} className="gantt-row">
                <div className="gantt-label">{task.month}</div>
                <div className="gantt-timeline">
                  {days.map((day) => (
                    <div key={day} className="gantt-cell">
                      {task.activities.map((activity, i) => {
                        if (day >= activity.start && day <= activity.end) {
                          return (
                            <div
                              key={i}
                              className="gantt-task"
                              style={{
                                backgroundColor: activity.color,
                                width: '100%',
                                height: '20px',
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No units available for the calendar view.</p>
          )}
        </div>
      )}

      {view === 'unit' && (
        <div className="unit-view">
          {units.length > 0 ? (
            <table className="unit-table">
              <thead>
                <tr>
                  <th>Unit Name</th>
                  <th>Unit Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit, index) => (
                  <tr key={index}>
                    <td>{unit.name}</td>
                    <td>{unit.type}</td>
                    <td>{unit.start_date}</td>
                    <td>{unit.end_date}</td>
                    <td>
                      <span
                        className={`status ${
                          unit.status === 'Completed'
                            ? 'completed'
                            : unit.status === 'In Progress'
                            ? 'in-progress'
                            : 'not-started'
                        }`}
                      >
                        {unit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No units available.</p>
          )}
        </div>
      )}

      {view === 'kanban' && (
        <div className="kanban-view">
          <div className="kanban-board">
            <div className="kanban-column">
              <h3 className="kanban-column-title">To Do</h3>
              {kanbanTasks.todo.length > 0 ? (
                kanbanTasks.todo.map((task, index) => (
                  <div key={index} className="kanban-card">
                    <h4>{task.name}</h4>
                    <p>{task.description}</p>
                    <div
                      className="kanban-status-bar"
                      style={{ backgroundColor: task.statusColor }}
                    ></div>
                  </div>
                ))
              ) : (
                <p>No tasks to do.</p>
              )}
            </div>
            <div className="kanban-column">
              <h3 className="kanban-column-title">In Progress</h3>
              {kanbanTasks.inProgress.length > 0 ? (
                kanbanTasks.inProgress.map((task, index) => (
                  <div key={index} className="kanban-card">
                    <h4>{task.name}</h4>
                    <p>{task.description}</p>
                    <div
                      className="kanban-status-bar"
                      style={{ backgroundColor: task.statusColor }}
                    ></div>
                  </div>
                ))
              ) : (
                <p>No tasks in progress.</p>
              )}
            </div>
            <div className="kanban-column">
              <h3 className="kanban-column-title">Done</h3>
              {kanbanTasks.done.length > 0 ? (
                kanbanTasks.done.map((task, index) => (
                  <div key={index} className="kanban-card">
                    <h4>{task.name}</h4>
                    <p>{task.description}</p>
                    <div
                      className="kanban-status-bar"
                      style={{ backgroundColor: task.statusColor }}
                    ></div>
                  </div>
                ))
              ) : (
                <p>No tasks completed.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;