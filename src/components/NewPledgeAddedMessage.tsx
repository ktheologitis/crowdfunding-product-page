import { useDispatch } from "react-redux";
import checkIcon from "../images/icon-check.svg";
import ActionButton from "./ActionButton";
import { pledgeAdded } from "../features/fundingData/fundingDataSlice";
import { Pledge } from "../features/fundingData/Modal";

const NewPledgeAddedMessage = ({
  newPledge,
  handleModal,
  handlePledgeAddedReset,
}: {
  newPledge: Pledge;
  handleModal: (status: "open" | "close") => void;
  handlePledgeAddedReset: () => void;
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className="new-pledge-complete-message"
      onClick={(e) => e.stopPropagation()}
    >
      <img className="checkIcon" src={checkIcon} alt="" />
      <h1>Thanks for your support!</h1>
      <p>
        Your pledge brings us one step closer to sharing Mastercraft
        Bamboo Monitor Riser worldwide. You will get an email once our
        campaign is completed.
      </p>
      <ActionButton
        label="Got it!"
        handleClick={() => {
          dispatch(
            pledgeAdded({
              productId: newPledge.productId,
              pledgeAmount: newPledge.amount,
            })
          );
          handlePledgeAddedReset();
          handleModal("close");
        }}
      />
    </div>
  );
};

export default NewPledgeAddedMessage;
