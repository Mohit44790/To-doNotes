// src/components/SyncStatus.js
import React from 'react';

const SyncStatus = ({ isOnline }) => {
  return (
    <div className={`fixed top-0 left-0 w-36  ${isOnline ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} rounded-md z-50`}>
      {isOnline ? (
        <p className='text-sm'>Status: Online</p>
      ) : (
        <p className='text-sm'>Status: Offline</p>
      )}
    </div>
  );
};

export default SyncStatus;
