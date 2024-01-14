type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className={`absolute top-0 left-0 w-full h-full bg-black/70 items-center justify-center ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white rounded-sm p-3">{children}</div>
    </div>
  );
};

export default Modal;
