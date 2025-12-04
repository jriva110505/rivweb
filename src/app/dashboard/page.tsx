"use client";
import { getToken } from "@/lib/auth";
import React from "react";

export default function DashboardHome() {
  const token = getToken();
  let username = "Guest";

  if (token) {
    try {
      // Extract payload from JWT manually
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      if (payload.username) username = payload.username;
    } catch (e) {
      console.error("Token decoding failed:", e);
      username = "Invalid Token";
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Welcome, {username}</h2>
      {token && (
        <>
          <p>Your Bearer Token:</p>
          <pre className="p-2 bg-slate-100 text-xs mt-2 break-all">{token}</pre>
        </>
      )}
    </div>
  );
}
