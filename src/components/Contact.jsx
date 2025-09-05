// src/components/Contact.jsx
import React, { useState } from "react";
import { Mail as MailIcon, Github as GithubIcon, Linkedin as LinkedinIcon } from "lucide-react";

const formAction = "https://formspree.io/f/mwpnwjlr"; 

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ sending: false, ok: false, msg: "Please fill all fields." });
      return;
    }
    setStatus({ sending: true, ok: null, msg: "" });

    if (!formAction) {
      setTimeout(() => {
        setStatus({ sending: false, ok: true, msg: "Demo: message received." });
        setForm({ name: "", email: "", message: "" });
      }, 800);
      return;
    }

    try {
      const res = await fetch(formAction, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus({ sending: false, ok: true, msg: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ sending: false, ok: false, msg: "Failed to send message." });
      }
    } catch (err) {
      setStatus({ sending: false, ok: false, msg: "Network error." });
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-zinc-900 dark:text-zinc-100">
          Get in <span className="text-indigo-500">Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
              I’d love to hear about new opportunities, collaborations, or any interesting project you’re working on.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:mohdrazakhan32@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-md transition"
              >
                <MailIcon className="w-5 h-5 text-indigo-500" />
                <span className="text-zinc-800 dark:text-zinc-200">mohdrazakhan32@gmail.com</span>
              </a>

              <a
                href="https://github.com/mohdrazakhan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-md transition"
              >
                <GithubIcon className="w-5 h-5 text-indigo-500" />
                <span className="text-zinc-800 dark:text-zinc-200">github.com/mohdrazakhan</span>
              </a>

              <a
                href="https://linkedin.com/in/mohdrazakhan32"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-md transition"
              >
                <LinkedinIcon className="w-5 h-5 text-indigo-500" />
                <span className="text-zinc-800 dark:text-zinc-200">linkedin.com/in/mohdrazakhan32</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 space-y-4">
            <input type="text" name="name" value={form.name} onChange={handleChange}
                   placeholder="Your name"
                   className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                   required />

            <input type="email" name="email" value={form.email} onChange={handleChange}
                   placeholder="you@email.com"
                   className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                   required />

            <textarea name="message" value={form.message} onChange={handleChange}
                      rows={5} placeholder="Your message..."
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                      required />

            <button type="submit" disabled={status.sending}
                    className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
              {status.sending ? "Sending..." : "Send Message"}
            </button>

            {status.msg && <p className={`text-sm mt-2 ${status.ok ? "text-green-500" : "text-rose-500"}`}>{status.msg}</p>}

            {!formAction && <p className="text-xs text-zinc-500 mt-2">I will reply your mail as soon as possible <code>formAction</code>.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
