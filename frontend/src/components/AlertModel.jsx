
import '../App.css';

const AlertModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Are you sure?</h2>
        <p className="modal-message">This action cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn btn-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-confirm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
