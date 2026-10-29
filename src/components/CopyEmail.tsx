"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy email");
  const [status, setStatus] = useState("");

  const copy = () => {
    navigator.clipboard
      .writeText(email)
      .then(
        () => {
          setLabel("Copied");
          setStatus("Email address copied");
        },
        () => {
          setLabel("Select the address to copy");
          setStatus("Couldn’t copy. Select the email address and copy it.");
        },
      )
      .finally(() =>
        setTimeout(() => {
          setLabel("Copy email");
          setStatus("");
        }, 2000),
      );
  };

  return (
    <>
      <button className="btn" type="button" onClick={copy}>
        {label}
      </button>
      <span className="sr-only" aria-live="polite">
        {status}
      </span>
    </>
  );
}
