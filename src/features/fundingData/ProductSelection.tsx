import { useEffect, useRef } from "react";
import classNames from "classnames";
import ActionButton from "../../components/ActionButton";
import {
  selectSelectedProduct,
  selectProductStock,
  productSelected,
} from "./fundingDataSlice";
import type { ProductType } from "./fundingDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Pledge } from "./Modal";

const ProductSelection = ({
  data,
  handleSelectedProductScrollToView,
  handleNewPledgeAdded,
}: {
  data: ProductType;
  handleSelectedProductScrollToView: (childTopOffset: number) => void;
  handleNewPledgeAdded: (pledge: Pledge) => void;
}) => {
  const productElement = useRef<HTMLDivElement>(null);
  const [pledgeAmount, setPledgeAmount] = useState("");

  const dispatch = useDispatch();

  const currentlySelectedProduct = useSelector(selectSelectedProduct);
  const productStock = useSelector(selectProductStock(data.id));

  const isNumber = (input: string) => {
    if (isNaN(Number(input))) return false;
    return true;
  };

  const inputContainerClass = classNames({
    "input-container": true,
    invalid: isNumber(pledgeAmount) === false,
  });

  const productSelectionActions = (
    <div className="product-selection-actions">
      <div className="divider divider-full" />
      <div className="modal-product-actions">
        <header>
          <p>Enter your pledge</p>
        </header>
        <div className="input-and-button">
          <div className={inputContainerClass}>
            <span className="dollar">$</span>
            <input
              className={"pledge-input"}
              type="text"
              name="pledge"
              id="pledge"
              disabled={productStock === 0}
              value={pledgeAmount}
              onChange={(e) => {
                setPledgeAmount(e.target.value);
              }}
            />
          </div>
          <div className="pledge-button">
            <ActionButton
              label="Continue"
              disabled={productStock === 0}
              handleClick={() => {
                if (isNumber(pledgeAmount)) {
                  handleNewPledgeAdded({
                    productId: data.id,
                    amount: parseFloat(pledgeAmount),
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (currentlySelectedProduct === data.id) {
      setTimeout(() => {
        const topOffset = productElement.current?.offsetTop; // pixels from top of page to selected productElement
        if (topOffset && currentlySelectedProduct === data.id)
          handleSelectedProductScrollToView(topOffset);
      }, 500);
    }
  }, []);

  const modalProductClass = classNames({
    "modal-product product": true,
    active: currentlySelectedProduct === data.id,
    disabled: productStock === 0,
  });

  return (
    <div
      id={"id" + data.id}
      className={modalProductClass}
      ref={productElement}
    >
      <header className="product-selection-header">
        <label htmlFor={data.id}>
          <input
            className="radio-input"
            type="radio"
            id={data.id}
            value={data.id}
            name="product-selection"
            disabled={productStock === 0}
            checked={currentlySelectedProduct === data.id}
            onChange={(e) => {
              dispatch(productSelected(data.id));
            }}
          />
          <div className="round-radio"></div>
          <div
            className={
              productStock === 0 ? "details disabled" : "details"
            }
            onClick={() => {
              if (productStock !== 0)
                dispatch(productSelected(data.id));
            }}
          >
            <p className="main">{data.name}</p>
            <p className="secondary">
              Pledge {data.limit.toString()} or more
            </p>
          </div>
        </label>
        <div className="stat">
          <p>{data.stock}</p> <span>left</span>
        </div>
      </header>
      <p>{data.description}</p>
      {currentlySelectedProduct === data.id &&
        productSelectionActions}
    </div>
  );
};

export default ProductSelection;
