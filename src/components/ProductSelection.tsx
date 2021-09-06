import ActionButton from "./ActionButton";

const ProductSelection = () => {
  return (
    <div className="modal-product product">
      <label htmlFor="selection">
        <input className="radio-input" type="radio" id="selection" />
        <div className="round-radio"></div>
        <div className="details">
          <p className="main">Pledge with no reward</p>
          <p className="secondary">Pledge $25 or more</p>
        </div>
      </label>
      <p>
        You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping
        is included.
      </p>
      <div className="stat">
        <p>101</p> <span>left</span>
      </div>
      <div className="divider divider-full" />
      <div className="modal-product-actions">
        <header>
          <p>Enter your pledge</p>
        </header>
        <div className="input-and-button">
          <div className="input-container">
            <span className="dollar">$</span>
            <input className="pledge-input" type="text" name="pledge" id="pledge" />
          </div>
          <div className="pledge-button">
            <ActionButton
              label="Continue"
              handleClick={() => {
                console.log("continue");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
