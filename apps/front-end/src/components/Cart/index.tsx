import { Dispatch, HTMLAttributes } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./Cart.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  products?: CartProductProps[];
  setIsOpenedCart: Dispatch<React.SetStateAction<boolean>>;
}

interface CartProductProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  quantity: number;
  price: number;
}

export default function Cart({ products, setIsOpenedCart, ...props }: Props) {
  return (
    <div {...props} className={`${styles.cart} ${props.className}`}>
      <div className={`${styles.cartContainer}`}>
        <div className={`${styles.header}`}>
          <h4>Your cart</h4>
          <button onClick={() => setIsOpenedCart(false)}>
            <IoMdClose />
          </button>
        </div>

        <div className={`${styles.productsList}`}>
          {products?.length ? (
            products.map((product, inx) => (
              <CartProduct
                key={`product-${inx}`}
                title={product.title}
                quantity={product.quantity}
                price={product.price}
                className={inx !== 0 ? "2xl:pt-4" : ""}
              />
            ))
          ) : (
            <div className={`${styles.empty}`}>
              <p>No products in cart</p>
            </div>
          )}
        </div>

        <div className={`${styles.actions}`}>
          <p>
            Total price:{" "}
            <span className="text-[#376F6F]">
              $
              {products?.reduce((acc, product) => {
                return acc + product.price * product.quantity;
              }, 0) || "0"}
            </span>
          </p>

          <button>Proceed to payment</button>
        </div>
      </div>
    </div>
  );
}

const CartProduct = ({
  title,
  quantity,
  price,
  ...props
}: CartProductProps) => {
  return (
    <div {...props} className={`${styles.product} ${props.className}`}>
      <div className={`${styles.productImage}`}></div>

      <div className={`${styles.productDetails}`}>
        <p className={`${styles.productTitle}`}>
          {title.length > 40 ? `${title.slice(0, 37)}...` : title}
        </p>

        <div className={`${styles.productPriceContainer}`}>
          <p className={`${styles.quantity}`}>Quantity: {quantity}</p>
          <p className={`${styles.price}`}>
            {quantity} x ${price} = ${quantity * price}
          </p>
        </div>
      </div>
    </div>
  );
};
