import { useSelector } from "react-redux";
import {
  selectTotalAmount,
  selectBackersCount,
} from "./fundingDataSlice";

const Statistics = () => {
  const totalAmount = useSelector(selectTotalAmount);
  const backers = useSelector(selectBackersCount);

  const progressBarWidth = ((totalAmount / 100000) * 100).toString();

  return (
    <section className="content-section statistics">
      <div className="numbers">
        <div className="single-stat">
          <h1>${totalAmount.toLocaleString()}</h1>
          <p>of $100,000 backed</p>
        </div>
        <div className="divider"></div>
        <div className="single-stat">
          <h1>{backers.toString()}</h1>
          <p>total backers</p>
        </div>
        <div className="divider"></div>
        <div className="single-stat">
          <h1>56</h1>
          <p>days left</p>
        </div>
      </div>
      <div className="background-bar">
        <div
          className="background-bar progress"
          style={{ width: progressBarWidth + "%" }}
        />
      </div>
    </section>
  );
};

export default Statistics;
