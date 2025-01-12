import PropTypes from "prop-types";
const ModalHeader = ({ title, children, onClose }) => {
  return (
    <>
      <h1 className="header-main modal-header">
        {children}
        {title}
      </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        className="modal-close"
        fill="#5f6368"
        onClick={onClose}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default ModalHeader;
