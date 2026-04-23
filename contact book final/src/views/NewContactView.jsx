import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/db";
import ContactForm from "../components/ContactForm";

export default function NewContactView() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const ref = await addDoc(collection(db, "contacts"), data);
    navigate(`/contacts/${ref.id}`);
  };

  return (
    <ContactForm
      title="New Contact"
      backTo="/"
      onSubmit={handleSubmit}
    />
  );
}