"use client";

import { CornerDownLeft } from "lucide-react";
import { useState } from "react";

export const Form = ({ disabled }: { disabled: boolean }) => {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const validRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <>
      <strong className="font-medium">Email:</strong>
      <input
        name="email"
        type="email"
        className="grow bg-amber-100 px-2 disabled:opacity-50 dark:bg-neutral-900"
        placeholder="Enter your email..."
        onChange={(e) => {
          setInput(e.target.value);
          setIsValid(validRegEx.test(input.toLowerCase()));
        }}
        disabled={disabled}
        required
      />
      {isValid && !disabled && (
        <button
          className="h-5 bg-amber-200 px-2 dark:bg-neutral-800"
          type="submit"
        >
          <CornerDownLeft className="size-4" />
        </button>
      )}
    </>
  );
};
