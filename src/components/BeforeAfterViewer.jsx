import React from 'react';

const BeforeAfterViewer = ({ original, edited }) => {
  if (!original || !edited) {
    return null;
  }

  return (
    <div className="before-after-viewer">
      <div className="image-container">
        <h3>Original</h3>
        <img src={original} alt="Original" />
      </div>
      <div className="image-container">
        <h3>Edited</h3>
        <img src={edited} alt="Edited" />
      </div>
    </div>
  );
};

export default BeforeAfterViewer;