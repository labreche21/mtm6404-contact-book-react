import { Routes, Route } from "react-router-dom";
import ContactsView from "./utils/views/ContactsView.jsx";
import ContactDetailView from "./utils/views/ContactDetailView.jsx";
import NewContactView from "./utils/views/NewContactView.jsx";
import EditContactView from "./utils/views/EditContactView.jsx";

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
