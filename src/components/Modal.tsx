import iconCloseModal from "../images/icon-close-modal.svg";
import ProductSelection from "./ProductSelection";

const Modal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h1>Back this project</h1>
          <button className="close-icon-button">
            <img src={iconCloseModal} alt="" />
          </button>
        </header>
        <p>Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>
        <ProductSelection />
      </div>
    </div>
  );
};

export default Modal;
