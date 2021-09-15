import ActionButton from "./ActionButton";
import { useWindowSize } from "../custom_hooks";

import bookmarkIcon from "../images/icon-bookmark.svg";
import projectLogo from "../images/logo-mastercraft.svg";

const ProjectIntro = ({ handleModal }: { handleModal: (action: "open" | "close") => void }) => {
  const width = useWindowSize();

  const bookmarkMobile = <img className="bookmark" src={bookmarkIcon} alt="bookmark icon" />;
  const bookmarkDesktop = (
    <div className="bookmark-desktop">
      {bookmarkMobile}
      <button className="action-button">Bookmark</button>
    </div>
  );

  return (
    <section className="content-section project-intro">
      <header>
        <img className="mastercraft-logo" src={projectLogo} alt="logo mastercraft" />
        <h1>Mastercraft Bamboo Monitor Riser</h1>
        <p>A beautifully handcrafted monitor stand to reduce neck and eye strain.</p>
        <div className="project-intro-actions">
          <ActionButton
            label="Back this project"
            handleClick={() => {
              handleModal("open");
            }}
          />
          {width < 768 ? bookmarkMobile : bookmarkDesktop}
        </div>
      </header>
    </section>
  );
};

export default ProjectIntro;
