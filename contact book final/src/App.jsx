import { Routes, Route } from "react-router-dom";
import ContactsView from "./views/ContactsView.jsx";
import ContactDetailView from "./views/ContactDetailView.jsx";
import NewContactView from "./views/NewContactView.jsx";
import EditContactView from "./views/EditContactView.jsx";

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
