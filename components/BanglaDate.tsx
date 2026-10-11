"use client";

import { useEffect, useState } from "react";

export default function BanglaDate() {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);
  return <span className="block min-h-4 text-xs text-base-content/60">{text}</span>;
}
