"use client";

import { register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

type RegisterState = {
  errors: {
    email: string[];
    password: string[];
    confirmPassword: string[];
  };
};

const registerState: RegisterState = {
  errors: {
    email: [],
    password: [],
    confirmPassword: [],
  },
};

export default function Register() {
  const [state, action, pending] = useActionState(register, registerState);

  return (
    <div className="mx-auto space-y-4">
      <h1 className="text-center text-2xl font-bold">Register</h1>

      <form
        className=" bg-gray-100 p-8 flex flex-col gap-2 shadow-md mx-auto lg:max-w-1/2"
        action={action}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          {state?.errors.email && (
            <p className="text-red-500">{state?.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          {state?.errors.password && (
            <p className="text-red-500">{state?.errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>

        <div className="flex gap-4 items-end flex-wrap mt-4">
          <button type="submit" className="btn-primary" disabled={pending}>
            {pending ? "Loading..." : "Register"}
          </button>
          <Link href="/" className="text-link">
            Login instead...
          </Link>
        </div>
      </form>
    </div>
  );
}
