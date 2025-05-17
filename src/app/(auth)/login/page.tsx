"use client";

import { login } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

type RegisterState = {
  errors: {
    email: string[];
    password: string[];
  };
  email: string;
};

const LoginState: RegisterState = {
  errors: {
    email: [],
    password: [],
  },
  email: "",
};

export default function Login() {
  const [state, action, pending] = useActionState(login, LoginState);

  return (
    <div className="mx-auto space-y-4">
      <h1 className="text-center text-2xl font-bold">Login</h1>

      <form
        className=" bg-gray-100 p-8 flex flex-col gap-2 shadow-md mx-auto lg:max-w-1/2"
        action={action}
      >
        <div className="space-y-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={state?.email as string}
          />
          {state?.errors.email && (
            <p className="errorMsg">{state?.errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          {state?.errors.password && state?.errors.password.length > 0 && (
            <div className="errorMsg">
              <p>Password must :</p>
              <ul className="list-disc list-inside ml-4">
                {state.errors.password.map((errMsg, index) => (
                  <li key={index}>{errMsg}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-4 items-end flex-wrap mt-4">
          <button type="submit" className="btn-primary" disabled={pending}>
            {pending ? "Loading..." : "Login"}
          </button>
          <Link href="/register" className="text-link">
            Register instead...
          </Link>
        </div>
      </form>
    </div>
  );
}
