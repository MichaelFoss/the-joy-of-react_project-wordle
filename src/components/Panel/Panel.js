import React, { useState } from 'react';

const Panel = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`panel ${isOpen ? 'open' : ''}`}>
      <div className="panelWrapper">
        <div className="panelLabel" onClick={toggleOpen}>
          {label}
        </div>
        <div className="panelContent">{children}</div>
      </div>
    </div>
  );
};

export default Panel;
