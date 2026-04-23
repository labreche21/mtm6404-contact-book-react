import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db";
import ContactForm from "../components/ContactForm";

export default function EditContactView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      const snap = await getDoc(doc(db, "contacts", id));
      if (snap.exists()) {
        setContact({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    fetchContact();
  }, [id]);

  const handleSubmit = async (data) => {
    await updateDoc(doc(db, "contacts", id), data);
    navigate(`/contacts/${id}`);
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

  return (
    <ContactForm
      title="Edit Contact"
      backTo={`/contacts/${id}`}
      initialData={contact}
      onSubmit={handleSubmit}
    />
  );
}
