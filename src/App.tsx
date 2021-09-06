import { useState } from "react";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Modal from "./components/Modal";
import ProjectInformation from "./components/ProjectInformation";
import ProjectIntro from "./components/ProjectIntro";
import SelectionCompleted from "./components/SelectionCompleted";
import Statistics from "./components/Statistics";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <ProjectIntro />
        <Statistics />
        <ProjectInformation />
      </div>
    </>
  );
}

export default App;
