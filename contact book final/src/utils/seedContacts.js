/**
 * seedContacts.js
 * ─────────────────────────────────────────────────────────────────────────────
 * One-time script to seed your Firestore database with sample contacts.
 *
 * HOW TO RUN:
 *   1. Make sure your Firebase config is filled in inside src/db.js
 *   2. Run:  node seedContacts.js
 *
 * NOTE: This script uses ES modules. Make sure your package.json has
 *       "type": "module", or rename this file to seedContacts.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// ── Paste your Firebase config here ──────────────────────────────────────────
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsmhQcwwBWc-QhPfbAAPd_6xPv1ScMt8E",
  authDomain: "contacts-3ac03.firebaseapp.com",
  projectId: "contacts-3ac03",
  storageBucket: "contacts-3ac03.firebasestorage.app",
  messagingSenderId: "929307186036",
  appId: "1:929307186036:web:20871b7aa0bf314f6ed221"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const contacts = [
  {
    firstName: "Alice",
    lastName: "Chen",
    email: "alice.chen@example.com",
    phone: "(613) 555-0101",
    company: "Algonquin College",
    address: "1385 Woodroffe Ave, Nepean, ON",
    notes: "Classmate from Web Dev course.",
  },
  {
    firstName: "Marcus",
    lastName: "Fitzgerald",
    email: "marcus.fitz@example.com",
    phone: "(613) 555-0182",
    company: "Shopify",
    address: "150 Elgin St, Ottawa, ON",
  },
  {
    firstName: "Priya",
    lastName: "Kapoor",
    email: "priya.kapoor@example.com",
    phone: "(416) 555-0239",
    company: "RBC",
    address: "20 King St W, Toronto, ON",
    notes: "Contact for internship inquiry.",
  },
  {
    firstName: "James",
    lastName: "O'Brien",
    email: "james.obrien@example.com",
    phone: "(613) 555-0347",
    company: "Ottawa Public Library",
  },
  {
    firstName: "Sofia",
    lastName: "Reyes",
    email: "sofia.reyes@example.com",
    phone: "(613) 555-0418",
    company: "CBC",
    address: "181 Queen St, Ottawa, ON",
  },
  {
    firstName: "David",
    lastName: "Tanaka",
    email: "david.tanaka@example.com",
    phone: "(613) 555-0556",
    company: "BlackBerry",
    notes: "Met at Ottawa tech meetup.",
  },
  {
    firstName: "Nadia",
    lastName: "Williams",
    email: "nadia.williams@example.com",
    phone: "(613) 555-0673",
    company: "University of Ottawa",
    address: "75 Laurier Ave E, Ottawa, ON",
  },
];

async function seed() {
  console.log("Seeding contacts…");
  for (const contact of contacts) {
    const ref = await addDoc(collection(db, "contacts"), contact);
    console.log(`  ✓ Added ${contact.firstName} ${contact.lastName} (${ref.id})`);
  }
  console.log("\nDone! All contacts added to Firestore.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});