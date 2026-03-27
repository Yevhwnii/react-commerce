import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import type { AppDispatch } from "../store";
import { loginThunk } from "../store/auth/authThunks";

import thumbnailImage from "../assets/images/auth/thumbnail.webp";

export function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      navigate("/", { replace: true });
    } catch {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex bg-white rounded-3xl justify-between py-5 px-8 border-border-primary border">
      <div>
        <h1>Login</h1>
        <p>How do i get started lorem ipsum dolor at?</p>
        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="Email" required />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
      </div>
      <div className="bg-primary rounded-2xl relative xl:min-h-200 flex flex-col">
        <div className="absolute left-16 top-1/4 text-white text-display-large max-w-[375px] -translate-y-1/2 z-10">
          <p>Very good works are waiting for you </p>
          <p>Sign up Now</p>
        </div>
        <div className="mt-auto relative z-0">
          <div className="absolute left-16 top-1/4 h-42.5 w-px bg-white" />
          <div className="absolute bottom-16 left-16 right-0 w-17.5 h-0.5 bg-white/20" />
          <img
            src={thumbnailImage}
            height="615px"
            width="620px"
            className="mt-auto"
            alt="Women holding a laptop"
          />
        </div>
      </div>
    </div>
  );
}
