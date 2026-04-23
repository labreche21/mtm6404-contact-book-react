import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../db";

export default function ContactDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      const ref = doc(db, "contacts", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setContact({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  if (loading) {
    return (
      <div className="page">
        <div className="state-msg">
          <div className="spinner" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="page">
        <div className="state-msg">
          <p className="state-emoji">🔍</p>
          <p>Contact not found.</p>
          <Link to="/" className="btn btn-ghost">
            ← Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="detail-header">
        <Link to="/" className="btn btn-ghost back-btn">
          ← Back
        </Link>
        <div className="detail-actions">
          <Link to={`/edit/${id}`} className="btn btn-secondary">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </button>
        </div>
      </header>

      <main className="detail-main">
        <div className="detail-avatar">
          {contact.firstName[0]}
          {contact.lastName[0]}
        </div>
        <h2 className="detail-name">
          {contact.firstName} {contact.lastName}
        </h2>

        <div className="detail-card">
          <DetailField icon="✉" label="Email" value={contact.email} />
          {contact.phone && (
            <DetailField icon="📞" label="Phone" value={contact.phone} />
          )}
          {contact.address && (
            <DetailField icon="📍" label="Address" value={contact.address} />
          )}
          {contact.company && (
            <DetailField icon="🏢" label="Company" value={contact.company} />
          )}
          {contact.notes && (
            <DetailField icon="📝" label="Notes" value={contact.notes} />
          )}
        </div>
      </main>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Contact?</h3>
            <p>
              This will permanently remove{" "}
              <strong>
                {contact.firstName} {contact.lastName}
              </strong>{" "}
              from your contacts.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailField({ icon, label, value }) {
  return (
    <div className="detail-field">
      <span className="detail-field-icon">{icon}</span>
      <div className="detail-field-content">
        <span className="detail-field-label">{label}</span>
        <span className="detail-field-value">{value}</span>
      </div>
    </div>
  );
}
