"use client";

import { useState, useEffect } from "react";

interface RideOrder {
  id: string;
  pickup: string;
  dropoff: string;
  type: "instant" | "scheduled";
  scheduledTime?: string;
  vehicle: string;
  estimatedPrice: number;
  status: string;
  createdAt: string;
}

function IconMapPin({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconCar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );
}

function IconClock({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconCalendar({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export default function RidesPage() {
  const [rides, setRides] = useState<RideOrder[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("a2b_rides") || "[]");
    setRides(stored);
  }, []);

  const cancelRide = (id: string) => {
    const updated = rides.map(r => r.id === id ? { ...r, status: "cancelled" } : r);
    setRides(updated);
    localStorage.setItem("a2b_rides", JSON.stringify(updated));
  };

  const clearCompleted = () => {
    const active = rides.filter(r => r.status !== "cancelled" && r.status !== "completed");
    setRides(active);
    localStorage.setItem("a2b_rides", JSON.stringify(active));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          My <span className="holographic">Rides</span>
        </h1>
        {rides.length > 0 && (
          <button onClick={clearCompleted} className="text-xs text-zinc-500 hover:text-gold transition-colors">
            Clear history
          </button>
        )}
      </div>

      {rides.length === 0 ? (
        <div className="text-center py-16">
          <IconCar className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400">No rides yet</p>
          <p className="text-zinc-500 text-sm mt-1">Book your first ride to see it here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <div key={ride.id} className="p-4 rounded-xl card-premium">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    ride.type === "instant" 
                      ? "bg-green-900/40 text-green-400" 
                      : "bg-blue-900/40 text-blue-400"
                  }`}>
                    {ride.type === "instant" ? "Instant" : "Scheduled"}
                  </span>
                  <span className={`text-xs ${
                    ride.status === "confirmed" ? "text-gold" :
                    ride.status === "cancelled" ? "text-red-400" : "text-zinc-400"
                  }`}>
                    {ride.status}
                  </span>
                </div>
                <span className="text-gold font-semibold">${ride.estimatedPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-zinc-300">
                  <IconMapPin className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="truncate">{ride.pickup}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <IconMapPin className="w-4 h-4 text-gold-light flex-shrink-0" />
                  <span className="truncate">{ride.dropoff}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500 mt-2">
                  <span className="flex items-center gap-1">
                    <IconCar className="w-3 h-3" /> {ride.vehicle}
                  </span>
                  {ride.scheduledTime && (
                    <span className="flex items-center gap-1">
                      <IconCalendar className="w-3 h-3" />
                      {new Date(ride.scheduledTime).toLocaleString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <IconClock className="w-3 h-3" />
                    {new Date(ride.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {ride.status === "confirmed" && (
                <button
                  onClick={() => cancelRide(ride.id)}
                  className="mt-3 text-xs text-red-400/70 hover:text-red-400 transition-colors"
                >
                  Cancel ride
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
