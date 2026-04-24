import { Routes, Route } from "react-router-dom";
import "../src/index.css";
import ContactsView from "../src/views/ContactsView";
import ContactDetailView from "../src/views/ContactDetailView";
import NewContactView from "../src/views/NewContactView";
import EditContactView from "../src/views/EditContactView";

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<ContactsView />} />
        <Route path="/contacts/:id" element={<ContactDetailView />} />
        <Route path="/new" element={<NewContactView />} />
        <Route path="/edit/:id" element={<EditContactView />} />
      </Routes>
    </div>
  );
}
