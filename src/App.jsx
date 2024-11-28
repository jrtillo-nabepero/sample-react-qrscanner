import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import QrScannerPage from './components/QrScannerPage'; // Import the other component

const App = () => {
  const [showAnotherComponent, setQrScannerPage] = useState(false); // State to toggle components

  return (
    <div className='container mx-auto'>
      {showAnotherComponent ? (
        <QrScannerPage /> // Render this component if the button is clicked
      ) : (
        <LandingPage 
          onProceed={() => setQrScannerPage(true)} // Pass callback to LandingPage
        />
      )}
    </div>
  );
};

export default App;
