import { makeAutoObservable } from "mobx";

interface Modal {
  open: boolean;
  body: null | JSX.Element;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null as null | JSX.Element,
  };

  constructor() {
    // this will make all the methods in this class observable
    makeAutoObservable(this);
  }

  // content that we will be opening as the modal is JSX Element - React component
  openModal = (content: JSX.Element) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
