"use client";

import { useState } from "react";
import { IoCart, IoSearchSharp } from "react-icons/io5";
import AuthButton from "../AuthButton";
import AuthModal from "../AuthModal";
import Cart from "../Cart";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpenedCart, setIsOpenedCart] = useState(false);

  return (
    <>
      <Cart
        setIsOpenedCart={setIsOpenedCart}
        className={`${isOpenedCart ? "translate-x-0" : "translate-x-[30vw]"}`}
      />

      <AuthModal />

      <header className={`${styles.header}`}>
        <div className={`${styles.container} container`}>
          <h1 className={`${styles.logo}`}>Coffee Shop</h1>

          <nav className={`${styles.nav}`}>
            <ul>
              {innerLinks.map((link, inx) => (
                <li key={inx}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`${styles.actions}`}>
            <div className={`${styles.search}`}>
              <input type="text" />
              <IoSearchSharp />
            </div>

            <button
              className={`${styles.cart}`}
              onClick={() => setIsOpenedCart(true)}
            >
              <IoCart size={24} />
              <p>Cart</p>
            </button>

            <AuthButton />
          </div>
        </div>
      </header>
    </>
  );
}

const innerLinks = ["Coffee", "Tea", "Food"];
