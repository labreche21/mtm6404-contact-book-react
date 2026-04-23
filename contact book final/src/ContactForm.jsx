import { useState } from "react";
import { Link } from "react-router-dom";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  notes: "",
};

export default function ContactForm({ initialData = {}, onSubmit, backTo, title }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initialData });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email.";
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Strip empty optional fields
    const data = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v.trim() !== "")
    );
    await onSubmit(data);
  };

  return (
    <div className="page">
      <header className="detail-header">
        <Link to={backTo} className="btn btn-ghost back-btn">
          ← Cancel
        </Link>
      </header>

      <main className="form-main">
        <h2 className="form-title">{title}</h2>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-section-label">Required</div>
          <div className="form-row">
            <FormField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
              placeholder="Jane"
            />
            <FormField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
              placeholder="Smith"
            />
          </div>
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="jane@example.com"
          />

          <div className="form-section-label">Optional</div>
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(613) 555-0100"
          />
          <FormField
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corp"
          />
          <FormField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main St, Ottawa, ON"
          />
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Any additional notes…"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={submitting}
          >
            {submitting ? "Saving…" : "Save Contact"}
          </button>
        </form>
      </main>
    </div>
  );
}

function FormField({ label, name, type = "text", value, onChange, error, placeholder }) {
  return (
    <div className={`form-group${error ? " has-error" : ""}`}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="form-input"
        placeholder={placeholder}
        autoComplete="off"
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
