import React from 'react';

const ScrollCard = () => {
  return (
    <div className="flex overflow-x-auto">
      <div className="flex-1 flex-no-wrap">
        <div className="flex flex-row">
          {/* Add your scrollable cards here */}
          <div className="bg-gray-200 rounded-lg p-4 mx-2" style={{ minWidth: '300px', maxWidth: '300px' }}>
            <h2 className="text-xl font-bold">Card 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-4 mx-2" style={{ minWidth: '300px', maxWidth: '300px' }}>
            <h2 className="text-xl font-bold">Card 2</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-4 mx-2" style={{ minWidth: '300px', maxWidth: '300px' }}>
            <h2 className="text-xl font-bold">Card 3</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default ScrollCard;
