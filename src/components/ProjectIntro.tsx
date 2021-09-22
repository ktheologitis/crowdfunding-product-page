import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";
import { useWindowSize } from "../custom_hooks";

import projectLogo from "../images/logo-mastercraft.svg";
import { resetSelection } from "../features/fundingData/fundingDataSlice";

const ProjectIntro = ({
  handleModal,
}: {
  handleModal: (action: "open" | "close") => void;
}) => {
  const width = useWindowSize();
  const dispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const bookmarkMobile = (
    <svg
      className={bookmarked ? "bookmark active" : "bookmark"}
      onClick={() => {
        setBookmarked(!bookmarked);
      }}
      width="56"
      height="56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle fill="#2F2F2F" cx="28" cy="28" r="28" />
        <path fill="#B1B1B1" d="M23 19v18l5-5.058L33 37V19z" />
      </g>
    </svg>
  );

  const bookmarkDesktop = (
    <div
      className={
        bookmarked ? "bookmark-desktop active" : "bookmark-desktop"
      }
      onClick={() => {
        setBookmarked(!bookmarked);
      }}
    >
      {bookmarkMobile}
      <button className={"action-button"}>Bookmark</button>
    </div>
  );

  return (
    <section className="content-section project-intro">
      <header>
        <img
          className="mastercraft-logo"
          src={projectLogo}
          alt="logo mastercraft"
        />
        <h1>Mastercraft Bamboo Monitor Riser</h1>
        <p>
          A beautifully handcrafted monitor stand to reduce neck and
          eye strain.
        </p>
        <div className="project-intro-actions">
          <ActionButton
            label="Back this project"
            handleClick={() => {
              handleModal("open");
              dispatch(resetSelection());
            }}
          />
          {width < 768 ? bookmarkMobile : bookmarkDesktop}
        </div>
      </header>
    </section>
  );
};

export default React.memo(ProjectIntro);
