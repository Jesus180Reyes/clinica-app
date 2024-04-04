import { FC } from 'react';
import Modal from 'react-modal';

interface Props {
  isActive: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export const CustomModal: FC<Props> = ({ children, isActive = false }) => {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    // setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isActive}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
    >
      {children}
    </Modal>
  );
};
