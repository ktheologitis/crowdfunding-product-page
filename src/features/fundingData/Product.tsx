import { useDispatch, useSelector } from "react-redux";
import {
  productSelected,
  selectProductStock,
} from "../fundingData/fundingDataSlice";
import type { ProductType } from "../fundingData/fundingDataSlice";

const Product = ({
  data,
  handleModal,
}: {
  data: ProductType;
  handleModal: (status: "open" | "close") => void;
}) => {
  const dispatch = useDispatch();

  const productStock = useSelector(selectProductStock(data.id));

  return (
    <div
      className={productStock === 0 ? "product disabled" : "product"}
    >
      <header className="product-header">
        <h2>{data.name}</h2>
        <p>Pledge {data.limit.toString()} or more</p>
      </header>
      <p>{data.description}</p>
      <div className="stat-and-button">
        <div className="stat">
          <p>{data.stock}</p> <span>left</span>
        </div>
        <button
          className={
            productStock === 0
              ? "action-button disabled"
              : "action-button"
          }
          disabled={productStock === 0}
          onClick={() => {
            handleModal("open");
            dispatch(productSelected(data.id));
          }}
        >
          Select Reward
        </button>
      </div>
    </div>
  );
};

export default Product;
