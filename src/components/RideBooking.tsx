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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

const VEHICLES = [
  { id: "tesla-standard", name: "Tesla Standard", description: "Model 3 - Comfortable & Quiet", multiplier: 1.0 },
  { id: "tesla-premium", name: "Tesla Premium", description: "Model 3 Long Range - Extra Space", multiplier: 1.25 },
  { id: "tesla-xl", name: "Tesla XL", description: "Model Y - Group Rides", multiplier: 1.5 },
];

function IconMapPin({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconNav({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function IconCalendar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

function IconCheck({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconAlert({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

export default function RideBooking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState<"instant" | "scheduled">("instant");
  const [scheduledTime, setScheduledTime] = useState("");
  const [vehicle, setVehicle] = useState("tesla-standard");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setPickup("Current Location");
        },
        () => setLocationError("Location access denied. Enter pickup manually.")
      );
    }
  }, []);

  const calculateEstimate = () => {
    if (!pickup || !dropoff) return;
    setIsEstimating(true);
    
    setTimeout(() => {
      const baseMiles = Math.max(2, Math.random() * 15 + 3);
      const baseFare = 3.50;
      const perMile = 1.75;
      const timeEstimate = baseMiles * 2.5;
      const perMin = 0.35;
      
      const selectedVehicle = VEHICLES.find(v => v.id === vehicle) || VEHICLES[0];
      let price = (baseFare + baseMiles * perMile + timeEstimate * perMin) * selectedVehicle.multiplier;
      
      if (rideType === "scheduled") price *= 0.9;
      
      setEstimate(Math.round(price * 100) / 100);
      setIsEstimating(false);
    }, 800);
  };

  const handleBook = () => {
    if (!pickup || !dropoff || !estimate) return;
    if (rideType === "scheduled" && !scheduledTime) return;

    const order: RideOrder = {
      id: `RIDE-${Date.now().toString(36).toUpperCase()}`,
      pickup,
      dropoff,
      type: rideType,
      scheduledTime: rideType === "scheduled" ? scheduledTime : undefined,
      vehicle: VEHICLES.find(v => v.id === vehicle)?.name || "Tesla Standard",
      estimatedPrice: estimate,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("a2b_rides") || "[]");
    existing.unshift(order);
    localStorage.setItem("a2b_rides", JSON.stringify(existing));

    setOrderSuccess(true);
    
    setTimeout(() => {
      setOrderSuccess(false);
      setDropoff("");
      setEstimate(null);
      if (rideType === "scheduled") setScheduledTime("");
    }, 4000);
  };

  const useCurrentLocation = () => {
    if (currentLocation) {
      setPickup("Current Location");
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setPickup("Current Location");
        },
        () => setLocationError("Could not get location. Please enter manually.")
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col lg:flex-row">
      {/* Map Area */}
      <div className="lg:w-1/2 h-64 lg:h-auto map-container relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <IconNav className="w-16 h-16 text-gold/40 mx-auto mb-4" />
            <p className="text-gold/60 text-sm font-medium">Live Map</p>
            <p className="text-zinc-500 text-xs mt-1">Toledo Metro • NW Ohio</p>
            {currentLocation && (
              <p className="text-gold/40 text-xs mt-2">
                {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
              </p>
            )}
          </div>
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
          <line x1="30%" y1="40%" x2="70%" y2="60%" stroke="#D4AF37" strokeWidth="3" strokeDasharray="8 4" />
          <circle cx="30%" cy="40%" r="8" fill="#D4AF37" />
          <circle cx="70%" cy="60%" r="8" fill="#FFD700" />
        </svg>
      </div>

      {/* Booking Panel */}
      <div className="lg:w-1/2 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">
            Book Your <span className="holographic">Ride</span>
          </h1>
          <p className="text-zinc-400 text-sm mb-6">Instant or scheduled • Tesla fleet • Local drivers</p>

          {orderSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-900/30 border border-green-500/40 flex items-center gap-3">
              <IconCheck className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-300">Ride Confirmed!</p>
                <p className="text-sm text-green-400/80">Your driver will be matched shortly.</p>
              </div>
            </div>
          )}

          {locationError && (
            <div className="mb-4 p-3 rounded-lg bg-yellow-900/20 border border-yellow-500/30 flex items-center gap-2 text-sm">
              <IconAlert className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300">{locationError}</span>
            </div>
          )}

          {/* Ride Type Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-zinc-900 rounded-xl">
            <button
              onClick={() => setRideType("instant")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                rideType === "instant"
                  ? "bg-gold text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Instant
            </button>
            <button
              onClick={() => setRideType("scheduled")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                rideType === "scheduled"
                  ? "bg-gold text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Scheduled
            </button>
          </div>

          {/* Pickup */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
              <IconMapPin className="w-4 h-4 text-gold" />
              Pickup Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup address"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
              <button
                onClick={useCurrentLocation}
                className="px-3 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-gold/50 transition-colors"
                title="Use current location"
              >
                <IconNav className="w-4 h-4 text-gold" />
              </button>
            </div>
          </div>

          {/* Dropoff */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
              <IconMapPin className="w-4 h-4 text-gold-light" />
              Dropoff Location
            </label>
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Where to?"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>

          {/* Scheduled Time */}
          {rideType === "scheduled" && (
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                <IconCalendar className="w-4 h-4 text-gold" />
                Schedule Pickup
              </label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
            </div>
          )}

          {/* Vehicle Selection */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
              <IconCar className="w-4 h-4 text-gold" />
              Vehicle
            </label>
            <div className="space-y-2">
              {VEHICLES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVehicle(v.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    vehicle === v.id
                      ? "border-gold bg-gold/10"
                      : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{v.name}</p>
                      <p className="text-xs text-zinc-400">{v.description}</p>
                    </div>
                    <span className="text-xs text-gold">{v.multiplier > 1 ? `+${Math.round((v.multiplier - 1) * 100)}%` : "Base"}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Estimate */}
          <button
            onClick={calculateEstimate}
            disabled={!pickup || !dropoff || isEstimating}
            className="w-full mb-4 py-3 rounded-lg border border-gold/40 text-gold font-medium text-sm hover:bg-gold/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isEstimating ? "Calculating..." : "Get Price Estimate"}
          </button>

          {estimate !== null && (
            <div className="mb-6 p-4 rounded-xl card-premium">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Estimated Fare</span>
                <span className="text-2xl font-bold text-gold">${estimate.toFixed(2)}</span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                {rideType === "scheduled" ? "Scheduled discount applied • " : ""}
                Final price may vary based on traffic and route.
              </p>
            </div>
          )}

          {/* Book Button */}
          <button
            onClick={handleBook}
            disabled={!pickup || !dropoff || !estimate || (rideType === "scheduled" && !scheduledTime)}
            className="w-full py-4 rounded-xl btn-gold text-base font-semibold disabled:opacity-40"
          >
            {rideType === "instant" ? "Request Ride Now" : "Schedule Ride"}
          </button>

          <p className="text-center text-xs text-zinc-500 mt-4">
            Transparent pricing • No surge surprises • Tesla comfort
          </p>
        </div>
      </div>
    </div>
  );
}
