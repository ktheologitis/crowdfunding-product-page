const Statistics = () => {
  return (
    <section className="content-section statistics">
      <div className="numbers">
        <div className="single-stat">
          <h1>$89,914</h1>
          <p>of $100,000 backed</p>
        </div>
        <div className="divider"></div>
        <div className="single-stat">
          <h1>5,007</h1>
          <p>total backers</p>
        </div>
        <div className="divider"></div>
        <div className="single-stat">
          <h1>56</h1>
          <p>days left</p>
        </div>
      </div>
      <div className="background-bar">
        <div className="background-bar progress" />
      </div>
    </section>
  );
};

export default Statistics;
