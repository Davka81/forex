import useAppSelector from "@/hooks/useAppSelector";
import useModals from "@/hooks/useModals";
import { ElementType, useState } from "react";

const Modals = () => {
  const openedModals = useAppSelector((state) => state.ui.openedModals);
  const { closeModal } = useModals();

  const [closingModals, setClosingModals] = useState<ElementType[]>([]);

  return (
    <>
      {openedModals.map((modal, index) => {
        const { Component, props } = modal;
        const isClosing = closingModals.includes(Component);
        const onClose = () => {
          setClosingModals((prev) => [...prev, Component]);
          setTimeout(() => {
            closeModal(Component);
            setClosingModals((prev) => prev.filter((cm) => cm !== Component));
          }, 500);
        };

        return <Component key={index} modalOpen={!isClosing} onClose={onClose} {...props} />;
      })}
    </>
  );
};

export default Modals;