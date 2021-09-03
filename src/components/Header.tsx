import { useWindowSize } from "../custom_hooks";
import mobileHeaderImage from "../images/image-hero-mobile.jpg";
import desktopHeaderImage from "../images/image-hero-desktop.jpg";
import logo from "../images/logo.svg";
import burgerIcon from "../images/icon-hamburger.svg";

const Header = () => {
  const width = useWindowSize();

  const burgerIconButton = (
    <img
      className="burger-icon-button"
      src={burgerIcon}
      alt="burger-icon"
      onClick={() => {
        console.log("pressed burger");
      }}
    />
  );

  const navigationList = (
    <nav>
      <ul className="navigation-list">
        <li>About</li>
        <li>Discover</li>
        <li>Get Started</li>
      </ul>
    </nav>
  );

  return (
    <>
      <header className="app-header">
        <picture className="header-img">
          <source media="(min-width: 768px)" srcSet={desktopHeaderImage} />
          <img src={mobileHeaderImage} alt="header pic" />
        </picture>
        <img className="logo" src={logo} alt="logo" />
        {width < 768 ? burgerIconButton : navigationList}
      </header>
    </>
  );
};

export default Header;
