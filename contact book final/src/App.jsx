import { Routes, Route } from "react-router-dom";
import "./App.css";
import ContactsView from "./views/ContactsView";
import ContactDetailView from "./views/ContactDetailView";
import NewContactView from "./views/NewContactView";
import EditContactView from "./views/EditContactView";

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
