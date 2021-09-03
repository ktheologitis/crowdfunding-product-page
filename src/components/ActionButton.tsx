import React from "react";

const ActionButton = ({ label, handleClick }: { label: string; handleClick: () => void }) => {
  return (
    <button className="action-button" onClick={handleClick}>
      {label}
    </button>
  );
};

export default ActionButton;
