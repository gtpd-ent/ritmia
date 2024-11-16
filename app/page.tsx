import React from 'react';

import Dashboard from './screens/Dashboard';
import Welcome from './screens/Welcome';

const Ritmia = () => {
  const authenticated = false;
  return (
    <main className="flex flex-col items-center">
      {!authenticated ? (
        <Welcome />
      ) : (
        <Dashboard />
      )}
    </main>
  );
};

export default Ritmia;