"use client";

import React, { useReducer, useState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/components/forms/submit-button";
import { register } from "./action";

interface FormState {
  success: boolean;
  message: null | string;
}

const initialState: FormState = {
  success: false,
  message: null,
};

function formReducer(state: FormState, action: Partial<FormState>): FormState {
  return { ...state, ...action };
}

export default function Signup() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirm && confirm !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
    if (password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  };

  function toggleVisibility() {
    setOpen(!open);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await register(state, formData);
    dispatch(result);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
          <Link
            href="/sign-in"
            className="text-blue-500 hover:underline text-sm"
          >
            <i className="fas fa-arrow-left mr-1"></i> เข้าสู่ระบบ
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <label className="block">
            <span className="text-gray-600">Email</span>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <i className="fa-solid fa-envelope px-3 text-gray-400"></i>
              <input
                type="email"
                name="email"
                className="w-full py-2 px-4 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </label>

          {/* Username */}
          <label className="block">
            <span className="text-gray-600">Username</span>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <i className="fa-solid fa-user px-3 text-gray-400"></i>
              <input
                type="text"
                name="username"
                className="w-full py-2 px-4 outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
          </label>

          {/* Password */}
          <label className="block">
            <span className="text-gray-600">Password</span>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <i className="fa-solid fa-lock px-3 text-gray-400"></i>
              <input
                type={open ? "text" : "password"}
                name="password"
                className="w-full py-2 px-4 outline-none"
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                required
              />
              <button type="button" className="px-3" onClick={toggleVisibility}>
                <i
                  className={`fa-solid ${open ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </button>
            </div>
          </label>

          {/* Confirm Password */}
          <label className="block">
            <span className="text-gray-600">Confirm Password</span>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <i className="fa-solid fa-key px-3 text-gray-400"></i>
              <input
                type={open ? "text" : "password"}
                className="w-full py-2 px-4 outline-none"
                placeholder="Confirm your password"
                onChange={handleConfirmChange}
                required
              />
            </div>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {state.message && (
            <p className="text-red-500 text-sm">Error: {state.message}</p>
          )}

          <SubmitButton pendingText="Signing up...">Sign Up</SubmitButton>
        </form>

        {state.success && (
          <dialog open className="modal bg-black/30">
            <div className="modal-box bg-white p-6 rounded-lg flex flex-col items-center gap-5">
              <button
                onClick={() => dispatch({ success: false })}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
              <h3 className="text-green-500 text-2xl font-bold mb-2">
                Register Successful!
              </h3>
              <i className="fa-solid fa-envelope text-9xl text-blue-500"></i>
              <p className="text-secondary text-center">
                Please verify your email to activate your account.
              </p>
              <a
                href="https://mail.google.com"
                target="_blank"
                className="btn hover:bg-primary text-white px-4 py-2 rounded-lg bg-blue-600"
              >
                Verify Email Address
              </a>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}
