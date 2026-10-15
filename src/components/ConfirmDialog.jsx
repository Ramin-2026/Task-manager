export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal small" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onCancel}>
            انصراف
          </button>
          <button className="btn danger" onClick={onConfirm}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
