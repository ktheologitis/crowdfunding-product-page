import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectBackedAmount,
  selectBackersCount,
  selectSelectedProduct,
} from "./fundingDataSlice";

const Statistics = () => {
  const backedAmount = useSelector(selectBackedAmount);
  const backers = useSelector(selectBackersCount);
  const selectedProduct = useSelector(selectSelectedProduct);

  const statisticsElement = useRef<HTMLDivElement>(null);
  const numbersElement = useRef<HTMLDivElement>(null);
  const progressBarElement = useRef<HTMLDivElement>(null);
  const backgroundBarElement = useRef<HTMLDivElement>(null);

  const progressBarWidth = (backedAmount / 100000) * 100;

  useEffect(() => {
    if (backgroundBarElement.current && selectedProduct !== "none") {
      statisticsElement.current!.scrollIntoView({
        behavior: "smooth",
      });

      numbersElement.current!.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 800, delay: 500, fill: "both" }
      );

      progressBarElement.current!.animate(
        [{ transform: `scaleX(0)` }, { transform: `scaleX(1)` }],
        {
          duration: 300,
          delay: 500,
          fill: "both",
          easing: "ease",
        }
      );

      backgroundBarElement.current.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 300, delay: 500, fill: "both" }
      );
    }
  }, [backedAmount, backers, selectedProduct]);

  return (
    <section
      className="content-section statistics"
      ref={statisticsElement}
    >
      <div className="numbers" ref={numbersElement}>
        <div className="single-stat">
          <h1>${backedAmount.toLocaleString()}</h1>
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
      <div className="background-bar" ref={backgroundBarElement}>
        <div
          ref={progressBarElement}
          className="background-bar progress"
          style={{ width: progressBarWidth.toString() + "%" }}
        />
      </div>
    </section>
  );
};

export default Statistics;
