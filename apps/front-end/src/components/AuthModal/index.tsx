"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import styles from "./AuthModal.module.css";

export default function AuthModal() {
  const [action, setAction] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const signInWithGoogle = (evt) => {
    evt.preventDefault();
    signIn("google");
  };

  const session = useSession()

  console.log(session)

  return (
    <div className={`${styles.overlay}`}>
      <div className={`${styles.modal}`}>
        <h3>{action === "login" ? "Login" : "Create an account"}</h3>

        <form action="" className={`${styles.form}`}>
          <div className={`${styles.fieldset}`}>
            <label htmlFor="phone">Enter your phone</label>
            <input id="phone" type="string" placeholder="+7 (953) 255-55-55" />
          </div>

          <div className={`${styles.fieldset}`}>
            <label htmlFor="password">Enter your password</label>
            <input id="password" type="password" placeholder="password" />
          </div>

          <button className={`${styles.submit}`}>
            {action === "login" ? "Log in" : "Create new account"}
          </button>

          <div className={`${styles.providers}`}>
            <button
              className={`${styles.provider}`}
              onClick={(evt) => {
                evt.preventDefault()
                signIn("google");
              }}
            >
              <BsGoogle size={32} />
              <p>Google</p>
            </button>
          </div>
        </form>

        <p className={`${styles.alreadyHaveAccoutn}`}>
          {action === "login"
            ? "Don't have an account? Then "
            : "Already have an account?"}
          <span
            className="text-[#376F6F] cursor-pointer"
            onClick={() => setAction(action === "login" ? "register" : "login")}
          >
            {action === "login" ? "create new account now." : "Then log in"}
          </span>
        </p>
      </div>
    </div>
  );
}
