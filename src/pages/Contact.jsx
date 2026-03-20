import { sitePlaceholders } from "../data/placeholders";

function Contact() {
  return (
    <section>
      <h1>Contact Us</h1>
      <p className="subtle">
        Contact integration is prepared for email service setup in a later phase.
      </p>

      <div className="grid two-col">
        <article className="panel">
          <h2>Contact Form</h2>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" placeholder="[TBD] Enter your name" required />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="[TBD] Enter your email" required />

            <label htmlFor="subject">Subject</label>
            <input id="subject" type="text" placeholder="[TBD] Message subject" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="[TBD] Your message" required />

            <button type="submit">Submit (Integration Pending)</button>
          </form>
        </article>

        <article className="panel">
          <h2>Official Contact</h2>
          <p>Email: {sitePlaceholders.contactEmail}</p>
          <p>[TBD] Phone number</p>
          <p>[TBD] Office address</p>
        </article>
      </div>
    </section>
  );
}

export default Contact;
