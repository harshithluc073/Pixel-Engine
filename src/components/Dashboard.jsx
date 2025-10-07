import React from 'react';
import ExperimentPlayground from './ExperimentPlayground';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to the Pixel Engine dashboard. Here you will find your search, quick access, and favorites.</p>
      <ExperimentPlayground />
    </div>
  );
};

export default Dashboard;