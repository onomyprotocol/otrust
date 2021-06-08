import React from 'react';

import './loadingBar.css';

export default function LoadingSpinner() {
  return (
    <div className="loadingSpinner">
      <svg>
        <circle cx="20" cy="20" r="20"></circle>
      </svg>
    </div>
  );
}
