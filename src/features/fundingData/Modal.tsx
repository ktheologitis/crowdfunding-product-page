import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProductIds,
  selectAllProducts,
  selectSelectedProduct,
  resetSelection,
} from "./fundingDataSlice";
import ProductSelection from "./ProductSelection";
import ActionButton from "../../components/ActionButton";
import NewPledgeAddedMessage from "../../components/NewPledgeAddedMessage";

export type Pledge = {
  productId?: string;
  amount: number;
};

const Modal = ({
  open,
  handleModal,
}: {
  open: boolean;
  handleModal: (status: "open" | "close") => void;
}) => {
  const [pledge, setPledge] = useState<Pledge>({
    amount: 0,
  });
  const [newPledgeAdded, setNewPledgeAdded] = useState(false);

  const modalElement = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const productIds = useSelector(selectAllProductIds);
  const products = useSelector(selectAllProducts);

  const currentlySelectedProduct = useSelector(selectSelectedProduct);

  const scrollSelectedProductToView = (childTopOffset: number) => {
    if (modalElement.current) {
      const modalOffset = modalElement.current.offsetTop;
      modalElement.current.scrollTop = childTopOffset - modalOffset;
    }
  };

  const handleNewPledgeAdded = (pledge: Pledge) => {
    setPledge(pledge);
    setNewPledgeAdded(true);
  };

  const handlePledgeAddedReset = () => {
    setNewPledgeAdded(false);
  };

  const noRewardPledge = (
    <div
      className={
        currentlySelectedProduct === "none"
          ? "modal-product product active"
          : "modal-product product"
      }
    >
      <label htmlFor="selection">
        <input
          className="radio-input"
          type="radio"
          name="product-selection"
          id="none"
          value="none"
          checked={currentlySelectedProduct === "none"}
          onChange={() => {
            dispatch(resetSelection());
          }}
        />
        <div className="round-radio"></div>
        <div
          className="details"
          onClick={() => {
            dispatch(resetSelection());
          }}
        >
          <p className="main">Pledge with no reward</p>
        </div>
      </label>
      <p>
        Choose to support us without a reward if you simply believe in
        our project. As a backer, you will be signed up to receive
        product updates via email.
      </p>
      {currentlySelectedProduct === "none" && (
        <>
          <div className="product-selection-actions">
            <div className="divider divider-full" />
            <div className="modal-product-actions">
              <div className="pledge-button">
                <ActionButton
                  label="Continue"
                  handleClick={() => {
                    handleNewPledgeAdded({ amount: 0 });
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const mainModalContent = (
    <div
      className="main-modal"
      ref={modalElement}
      onClick={(e) => {
        e.stopPropagation(); // So that modal does not close when clicking inside of it
      }}
    >
      <header className="modal-header">
        <h1>Back this project</h1>
        <button
          className="close-icon-button"
          onClick={() => {
            dispatch(resetSelection());
            handleModal("close");
          }}
        >
          <svg
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.314 0l2.828 2.828L9.9 7.071l4.243 4.243-2.828 2.828L7.07 9.9l-4.243 4.243L0 11.314 4.242 7.07 0 2.828 2.828 0l4.243 4.242L11.314 0z"
              fill="#000"
              fill-rule="evenodd"
              opacity=".4"
            />
          </svg>
        </button>
      </header>
      <p>
        Want to support us in bringing Mastercraft Bamboo Monitor
        Riser out in the world?
      </p>
      {noRewardPledge}
      {productIds.map((id) => {
        return (
          <ProductSelection
            data={products[id]}
            handleSelectedProductScrollToView={
              scrollSelectedProductToView
            }
            handleNewPledgeAdded={handleNewPledgeAdded}
          />
        );
      })}
    </div>
  );

  return (
    <div
      className={open ? "modal-overlay active" : "modal-overlay"}
      onClick={() => {
        handleModal("close");
        dispatch(resetSelection());
      }}
    >
      {newPledgeAdded === true ? (
        <NewPledgeAddedMessage
          newPledge={pledge}
          handleModal={handleModal}
          handlePledgeAddedReset={handlePledgeAddedReset}
        />
      ) : (
        mainModalContent
      )}
    </div>
  );
};

export default Modal;
