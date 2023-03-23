import { useCallback, useState } from 'react';
import { Modal as ModalComp } from 'components/Modal/Modal';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const showModal = () => setIsShowing(!isShowing);

  const Modal = useCallback(
    (props) => (
      <ModalComp open={isShowing} setOpen={showModal} {...props}>
        {props.children}
      </ModalComp>
    ),
    [isShowing]
  );

  return {
    showModal,
    Modal
  };
};
