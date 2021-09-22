import { useEffect, useRef } from "react";
import classNames from "classnames";
import ActionButton from "../../components/ActionButton";
import {
  selectSelectedProduct,
  selectProductStock,
  productSelected,
} from "./fundingDataSlice";
import type { Pledge } from "./Modal";
import type { ProductType } from "./fundingDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const ProductSelection = ({
  data,
  handleSelectedProductScrollToView,
  handleNewPledgeAdded,
}: {
  data: ProductType;
  handleSelectedProductScrollToView: (childTopOffset: number) => void;
  handleNewPledgeAdded: (pledge: Pledge) => void;
}) => {
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [inputContainerClass, setInputContainerClass] =
    useState("input-container");
  const productElement = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const currentlySelectedProduct = useSelector(selectSelectedProduct);
  const productStock = useSelector(selectProductStock(data.id));

  const isNumber = (input: string) => {
    console.log("Is number check: " + Number(input));
    if (isNaN(Number(input))) return false;
    return true;
  };

  const handleOnContinue = () => {
    if (
      isNumber(pledgeAmount) &&
      Number(pledgeAmount) >= data.limit
    ) {
      handleNewPledgeAdded({
        productId: data.id,
        amount: Number(pledgeAmount),
      });
    } else {
      setInputContainerClass("input-container invalid");
    }
  };

  const modalProductClass = classNames({
    "modal-product product": true,
    active: currentlySelectedProduct === data.id,
    disabled: productStock === 0,
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
              placeholder="0.00"
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
              handleClick={() => handleOnContinue()}
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
