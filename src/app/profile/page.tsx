"use client";

import { useState, useEffect } from "react";

function IconUser({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function IconPhone({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function IconMail({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconMapPin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconCard({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function IconShield({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("a2b_profile") || "{}");
    setName(profile.name || "");
    setPhone(profile.phone || "");
    setEmail(profile.email || "");
  }, []);

  const saveProfile = () => {
    localStorage.setItem("a2b_profile", JSON.stringify({ name, phone, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Your <span className="holographic">Profile</span>
      </h1>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
            <IconUser className="w-4 h-4 text-gold" /> Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
            <IconPhone className="w-4 h-4 text-gold" /> Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
            <IconMail className="w-4 h-4 text-gold" /> Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
          />
        </div>

        <button onClick={saveProfile} className="w-full py-3 rounded-xl btn-gold font-semibold">
          {saved ? "Saved!" : "Save Profile"}
        </button>
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold text-zinc-300">Payment Methods</h2>
        <div className="p-4 rounded-xl card-premium flex items-center gap-3">
          <IconCard className="w-5 h-5 text-gold" />
          <div className="flex-1">
            <p className="text-sm">Add payment method</p>
            <p className="text-xs text-zinc-500">Stripe integration coming soon</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-zinc-300 mt-6">Saved Locations</h2>
        <div className="p-4 rounded-xl card-premium flex items-center gap-3">
          <IconMapPin className="w-5 h-5 text-gold" />
          <div className="flex-1">
            <p className="text-sm">Home • Work</p>
            <p className="text-xs text-zinc-500">Quick access for frequent trips</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gold/20 flex items-center gap-3 mt-6">
          <IconShield className="w-5 h-5 text-gold" />
          <div>
            <p className="text-sm font-medium">Safety Features</p>
            <p className="text-xs text-zinc-500">Share trip • Emergency button • Driver verification</p>
          </div>
        </div>
      </div>
    </div>
  );
}
