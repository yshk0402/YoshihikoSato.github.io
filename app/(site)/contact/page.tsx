export default function ContactPage() {
  return (
    <div className="page">
      <header className="page-intro">
        <h1>Contact</h1>
        <p>TODO: Add a short prompt that sets response expectations.</p>
      </header>

      <form className="contact-form">
        <label className="form-field" htmlFor="contact-name">
          <span>Name</span>
          <input id="contact-name" name="name" type="text" required />
        </label>

        <label className="form-field" htmlFor="contact-email">
          <span>Email</span>
          <input id="contact-email" name="email" type="email" required />
        </label>

        <label className="form-field" htmlFor="contact-message">
          <span>Message</span>
          <textarea id="contact-message" name="message" rows={6} required />
        </label>

        <button className="cta" type="submit">
          Send inquiry
        </button>
      </form>

      <p className="helper-text">
        TODO: Connect spam protection and email delivery.
      </p>
    </div>
  );
}
