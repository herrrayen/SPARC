import { useState } from "react";
import { sitePlaceholders } from "../data/placeholders";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!accessKey) {
      setSubmitStatus({
        type: "error",
        message: "Form service is not configured yet. Please add VITE_WEB3FORMS_ACCESS_KEY.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    const formData = new FormData(form);
    const payload = {
      access_key: accessKey,
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      from_name: "SPARC Website Contact Form",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";
      let result = null;

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { message: text };
      }

      if (response.ok && result?.success !== false) {
        form.reset();
        setSubmitStatus({
          type: "success",
          message: "Your message was sent successfully.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result?.message || "Unable to send your message right now.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error?.message ? `Network error: ${error.message}` : "Network error. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Contact Us</h1>
      <p className="subtle">
        Send us a message directly and we will get back to you soon.
      </p>

      <div className="grid two-col">
        <article className="panel">
          <h2>Contact Form</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" placeholder="Enter your name" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Enter your email" required />

            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Message subject" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Your message" required />

            {submitStatus.message && (
              <p className={submitStatus.type === "success" ? "form-status-success" : "form-status-error"}>
                {submitStatus.message}
              </p>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
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
