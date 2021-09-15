import ActionButton from "../../components/ActionButton";
import {
  pledgeAdded,
  selectSelectedProduct,
} from "./fundingDataSlice";
import type { ProductType } from "./fundingDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const ProductSelection = ({
  data,
  selectedProduct,
  handleModal,
}: {
  data: ProductType;
  selectedProduct: string;
  handleModal: (status: "open" | "close") => void;
}) => {
  const [pledgeAmount, setPledgeAmount] = useState("");

  const dispatch = useDispatch();

  const currentlySelectedProduct = useSelector(selectSelectedProduct);

  return (
    <div className="modal-product product">
      <label htmlFor="selection">
        <input
          className="radio-input"
          type="radio"
          id="selection"
          checked={currentlySelectedProduct === data.id}
        />
        <div className="round-radio"></div>
        <div className="details">
          <p className="main">Pledge with no reward</p>
          <p className="secondary">
            Pledge {data.limit.toString()} or more
          </p>
        </div>
      </label>
      <p>
        You get two Special Edition Mahogany stands, a Backer T-Shirt,
        and a personal thank you. You’ll be added to our Backer member
        list. Shipping is included.
      </p>
      <div className="stat">
        <p>{data.stock}</p> <span>left</span>
      </div>
      <div className="divider divider-full" />
      <div className="modal-product-actions">
        <header>
          <p>Enter your pledge</p>
        </header>
        <div className="input-and-button">
          <div className="input-container">
            <span className="dollar">$</span>
            <input
              className="pledge-input"
              type="text"
              name="pledge"
              id="pledge"
              value={pledgeAmount}
              onChange={(e) => {
                setPledgeAmount(e.target.value);
              }}
            />
          </div>
          <div className="pledge-button">
            <ActionButton
              label="Continue"
              handleClick={() => {
                dispatch(
                  pledgeAdded({
                    productId: data.id,
                    pledgeAmount: parseFloat(pledgeAmount),
                  })
                );
                handleModal("close");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
