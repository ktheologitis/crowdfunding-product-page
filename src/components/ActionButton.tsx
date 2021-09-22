import React from "react";

const ActionButton = ({
  label,
  handleClick,
  disabled,
}: {
  label: string;
  handleClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={
        disabled ? "action-button disabled" : "action-button"
      }
      onClick={handleClick}
      disabled={disabled ? disabled : false}
    >
      {label}
    </button>
  );
};

export default ActionButton;
