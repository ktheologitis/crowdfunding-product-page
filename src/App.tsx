import React, { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Header from "./components/Header";
import ProjectInformation from "./features/fundingData/ProjectInformation";
import ProjectIntro from "./components/ProjectIntro";
import Modal from "./features/fundingData/Modal";
import Statistics from "./features/fundingData/Statistics";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = useCallback((action: "open" | "close") => {
    if (action === "open") {
      setModalOpen(true);
      return;
    }
    setModalOpen(false);
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <div className="content">
        <ProjectIntro handleModal={handleModal} />
        <Statistics />
        <ProjectInformation handleModal={handleModal} />
      </div>
      {modalOpen && (
        <Modal open={modalOpen} handleModal={handleModal} />
      )}
    </Provider>
  );
}

export default App;
