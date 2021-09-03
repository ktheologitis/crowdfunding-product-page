import ActionButton from "./ActionButton";

import bookmarkIcon from "../images/icon-bookmark.svg";

const ProjectIntro = () => {
  return (
    <section className="project-intro-container">
      <header>
        <h1>Mastercraft Bamboo Monitor Riser</h1>
        <p>A beautifully handcrafted monitor stand to reduce neck and eye strain.</p>
        <div className="project-intro-actions">
          <ActionButton
            label="Back this project"
            handleClick={() => {
              console.log("clicked button");
            }}
          />
          <img className="bookmark" src={bookmarkIcon} alt="bookmark icon" />
        </div>
      </header>
    </section>
  );
};

export default ProjectIntro;
