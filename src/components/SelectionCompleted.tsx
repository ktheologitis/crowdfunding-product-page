import checkIcon from "../images/icon-check.svg";
import ActionButton from "./ActionButton";

const SelectionCompleted = () => {
  return (
    <div className="modal-overlay">
      <div className="selection-completed">
        <img className="checkIcon" src={checkIcon} alt="" />
        <h1>Thanks for your support!</h1>
        <p>
          Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is
          completed.
        </p>
        <ActionButton
          label="Got it!"
          handleClick={() => {
            console.log("got it!");
          }}
        />
      </div>
    </div>
  );
};

export default SelectionCompleted;
