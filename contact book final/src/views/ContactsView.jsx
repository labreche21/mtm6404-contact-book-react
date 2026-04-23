import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../db";

export default function ContactsView() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, "contacts"), orderBy("lastName"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setContacts(data);
      setLoading(false);
    };
    fetchContacts();
  }, []);

  const filtered = contacts.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(term) ||
      c.lastName.toLowerCase().includes(term)
    );
  });

  // Group contacts by first letter of last name
  const grouped = filtered.reduce((acc, contact) => {
    const letter = contact.lastName[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {});

  return (
    <div className="page">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="header-title">
            <span className="header-icon">⬡</span>
            <h1>Contacts</h1>
          </div>
          <Link to="/new" className="btn btn-primary">
            + New Contact
          </Link>
        </div>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>
      </header>

      {/* Contact List */}
      <main className="contact-list-container">
        {loading ? (
          <div className="state-msg">
            <div className="spinner" />
            <p>Loading contacts…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="state-msg">
            <p className="state-emoji">📭</p>
            <p>No contacts found.</p>
            {search && (
              <button className="btn btn-ghost" onClick={() => setSearch("")}>
                Clear search
              </button>
            )}
          </div>
        ) : (
          Object.keys(grouped)
            .sort()
            .map((letter) => (
              <div key={letter} className="letter-group">
                <div className="letter-header">{letter}</div>
                {grouped[letter].map((contact) => (
                  <Link
                    to={`/contacts/${contact.id}`}
                    key={contact.id}
                    className="contact-row"
                  >
                    <div className="contact-avatar">
                      {contact.firstName[0]}
                      {contact.lastName[0]}
                    </div>
                    <div className="contact-row-info">
                      <span className="contact-name">
                        {contact.firstName} {contact.lastName}
                      </span>
                      <span className="contact-email">{contact.email}</span>
                    </div>
                    <span className="contact-arrow">›</span>
                  </Link>
                ))}
              </div>
            ))
        )}
      </main>
    </div>
  );
}