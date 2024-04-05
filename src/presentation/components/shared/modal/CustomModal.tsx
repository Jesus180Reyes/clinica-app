import { FC } from 'react';
import Modal, { Styles } from 'react-modal';

interface Props {
  isActive: boolean;
  children: React.ReactNode;
}
const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '500px',
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
