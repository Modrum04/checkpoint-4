import { Link, useNavigate } from "react-router-dom";
import "./Modal.scss";
import BackButton from "./BackButton";

function Modal({ isOpen, message }) {
  const navigate = useNavigate();
  const closeModal = () => {
    navigate("/");
  };
  return isOpen ? (
    <Link className="modal" role="dialog" aria-modal="true" to="/reports" onClick={closeModal}>
      <div className="modal-content">
        <BackButton />
        <p>{message}</p>
      </div>
    </Link>
  ) : null;
}

export default Modal;
