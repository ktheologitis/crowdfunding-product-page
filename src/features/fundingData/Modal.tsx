import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProductIds,
  selectAllProducts,
  resetSelection,
} from "./fundingDataSlice";
import iconCloseModal from "../../images/icon-close-modal.svg";
import ProductSelection from "./ProductSelection";

const Modal = ({
  handleModal,
}: {
  handleModal: (status: "open" | "close") => void;
}) => {
  const dispatch = useDispatch();
  const productIds = useSelector(selectAllProductIds);
  const products = useSelector(selectAllProducts);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h1>Back this project</h1>
          <button
            className="close-icon-button"
            onClick={() => {
              handleModal("close");
              dispatch(resetSelection());
            }}
          >
            <img src={iconCloseModal} alt="" />
          </button>
        </header>
        <p>
          Want to support us in bringing Mastercraft Bamboo Monitor
          Riser out in the world?
        </p>
        {productIds.map((id) => {
          return (
            <div id={id} className="single-product-selection">
              <ProductSelection
                data={products[id]}
                selectedProduct={id}
                handleModal={handleModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
