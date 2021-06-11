import React, { useState, createContext, useContext } from 'react';

import Modal from 'context/modal/modal';

export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const UpdateModalContext = createContext();
export const useUpdateModal = () => useContext(UpdateModalContext);

let ModalProvider = ({ children }) => {
  let [modal, updateModal] = useState(false);
  let [modalContent, updateModalContent] = useState("I'm the Modal Content");

  let handleModal = (content = false) => {
    updateModal(!modal);
    if (content) {
      updateModalContent(content);
    }
  };

  const contextValue = {
    handleModal,
    modal,
    modalContent,
  };

  const updateValue = {
    updateModal,
    updateModalContent,
  };

  return (
    <UpdateModalContext.Provider value={updateValue}>
      <ModalContext.Provider value={contextValue}>
        <Modal />
        {children}
      </ModalContext.Provider>
    </UpdateModalContext.Provider>
  );
};

export default ModalProvider;
