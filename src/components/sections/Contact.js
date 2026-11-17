import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import '../../styles/ContactStyle.css';

const CONTACT_EMAIL = 'igorsanpaixao@gmail.com';

/*
  Envio do formulário:
  - Se REACT_APP_FORM_ENDPOINT estiver definido (ex.: um endpoint do Formspree,
    https://formspree.io/f/xxxx), a mensagem é enviada direto por POST.
  - Senão, abre o app de e-mail do visitante com a mensagem já preenchida.
*/
const FORM_ENDPOINT = process.env.REACT_APP_FORM_ENDPOINT;

const initialForm = { name: '', email: '', message: '' };

const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (status !== 'idle' && status !== 'sending') setStatus('idle');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!FORM_ENDPOINT) {
            const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
            const body = encodeURIComponent(`${form.message}\n\n${form.name} <${form.email}>`);
            window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
            return;
        }

        setStatus('sending');
        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setStatus('sent');
            setForm(initialForm);
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contacts" className="section contact-section">
            <div className="contact-intro">
                <h2 className="section-title">
                    Let's <span className="accent">talk</span>
                </h2>
                <p className="contact-text">
                    Have a project in mind, an opportunity or just want to say hi?
                    Send me a message and I'll get back to you.
                </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className="form-field">
                        <span>Name</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            autoComplete="name"
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </label>
                </div>

                <label className="form-field">
                    <span>Message</span>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={6}
                        required
                    />
                </label>

                <div className="form-footer">
                    <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Send message'}
                        <FaPaperPlane />
                    </button>

                    <p className={`form-feedback ${status}`} role="status">
                        {status === 'sent' && 'Message sent! I\'ll get back to you soon.'}
                        {status === 'error' && `Something went wrong. Email me at ${CONTACT_EMAIL}.`}
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Contact;
