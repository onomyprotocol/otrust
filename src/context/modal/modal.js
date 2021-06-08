import React from 'react';
import ReactDOM from 'react-dom';
import { Dimmer } from 'components/UI/Dimmer';

import { useModal } from 'context/modal/ModalContext';

const Modal = () => {
  let { modalContent, modal } = useModal();
  if (modal) {
    return ReactDOM.createPortal(<Dimmer>{modalContent}</Dimmer>, document.querySelector('#modal-root'));
  } else return null;
};

export default Modal;
