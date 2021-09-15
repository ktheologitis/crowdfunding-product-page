import { useDispatch } from "react-redux";
import { productSelected } from "../fundingData/fundingDataSlice";
import type { ProductType } from "../fundingData/fundingDataSlice";

const Product = ({
  data,
  handleModal,
}: {
  data: ProductType;
  handleModal: (status: "open" | "close") => void;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="product">
      <header className="product-header">
        <h2>{data.name}</h2>
        <p>Pledge {data.limit.toString()} or more</p>
      </header>
      <p>
        You get an ergonomic stand made of natural bamboo. You've
        helped us launch our promotional campaign, and you’ll be added
        to a special Backer member list.
      </p>
      <div className="stat-and-button">
        <div className="stat">
          <p>{data.stock}</p> <span>left</span>
        </div>
        <button
          className="action-button"
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
