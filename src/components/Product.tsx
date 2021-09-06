const Product = () => {
  return (
    <div className="product">
      <header className="product-header">
        <h2>Name</h2>
        <p>Pledge $25 or more</p>
      </header>
      <p>
        You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer
        member list.
      </p>
      <div className="stat-and-button">
        <div className="stat">
          <p>101</p> <span>left</span>
        </div>
        <button className="action-button">Select Reward</button>
      </div>
    </div>
  );
};

export default Product;
