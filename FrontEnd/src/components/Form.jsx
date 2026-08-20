import { React, useState } from 'react'
import { config } from '../config/config';


const API_URL = config.API_URL;

export default function Form() {
    const initialForm = { name: "", email: "", subject: "", message: "", website: "" };
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [serverMessage, setServerMessage] = useState("");

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const validate = () => {
        const next = {};
        if (!form.name.trim()) next.name = "Please enter your name.";
        if (!form.email.trim()) next.email = "Please enter your email.";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "That email doesn't look right.";
        if (!form.message.trim()) next.message = "Say a little about what you have in mind.";
        setErrors(next);
        return Object.keys(next).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus("loading");
        setServerMessage("");

        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok || !data.ok) {
                if (data.errors) setErrors(data.errors);
                setServerMessage(data.message || "Something went wrong. Please try again.");
                setStatus("error");
                return;
            }

            setStatus("success");
            setServerMessage(data.message || "Thanks — I'll get back to you soon.");
            setForm(initialForm);
        } catch {
            setStatus("error");
            setServerMessage("Couldn't reach the server. Please try again shortly.");
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
                {/* Honeypot: hidden from real users via CSS, but bots that
                    auto-fill every field will trip it. Backend checks this. */}
                <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={update("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div className="fd-field">
                        <label htmlFor="name" className="fd-field-label block mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={update("name")}
                            placeholder="Jane Doe"
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                            <p className="fd-body text-[#E2726B] text-xs mt-1.5">{errors.name}</p>
                        )}
                    </div>
                    <div className="fd-field">
                        <label htmlFor="email" className="fd-field-label block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={update("email")}
                            placeholder="jane@email.com"
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <p className="fd-body text-[#E2726B] text-xs mt-1.5">{errors.email}</p>
                        )}
                    </div>
                </div>

                <div className="fd-field">
                    <label htmlFor="subject" className="fd-field-label block mb-1">
                        Subject
                    </label>
                    <input
                        id="subject"
                        type="text"
                        value={form.subject}
                        onChange={update("subject")}
                        placeholder="What's this about?"
                    />
                </div>

                <div className="fd-field">
                    <label htmlFor="message" className="fd-field-label block mb-1">
                        Message
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Tell me a bit about it..."
                        aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                        <p className="fd-body text-[#E2726B] text-xs mt-1.5">{errors.message}</p>
                    )}
                </div>

                <div className="flex items-center gap-5 pt-2">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="fd-btn-primary px-6 py-3 rounded-full fd-mono text-[12px] tracking-[0.12em] uppercase font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? "Sending..." : "Send Message"}
                    </button>

                    {status === "success" && (
                        <span className="fd-body text-sm text-[#5FBE8D]">
                            {serverMessage}
                        </span>
                    )}
                    {status === "error" && (
                        <span className="fd-body text-sm text-[#E2726B]">
                            {serverMessage}
                        </span>
                    )}
                </div>
            </form>
        </>
    )
}
