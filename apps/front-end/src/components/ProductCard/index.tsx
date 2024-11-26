"use client";

import Link from "next/link";
import { HTMLAttributes, useState } from "react";
import "swiper/css";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import styles from "./ProductCard.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price: string;
  modifications?: string[];
}

interface ModificationProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

export default function ProductCard({
  title,
  description,
  price,
  modifications,
  ...props
}: Props) {
  const [selectedModification, setSelectedModification] = useState<string>("");

  const swiperOptions: SwiperOptions = {
    mousewheel: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    modules: [Mousewheel],
  };

  return (
    <div className={`${styles.card} group hover:scale-[1.05] `} {...props}>
      <div className={`${styles.productImage}`}></div>
      <div className={`${styles.cardContent} group-hover:text-white`}>
        <h4 className={`${styles.productTitle}`}>{title}</h4>

        <div className={`${styles.product} w-full`}>
          <div
            className={`${styles.productInfo} group-hover:invisible group-hover:opacity-0`}
          >
            <p>{description}</p>
          </div>

          <div
            className={`${styles.actionsContainer} group-hover:visible group-hover:!opacity-100 group-hover:!scale-100`}
          >
            <Swiper {...swiperOptions}>
              {modifications?.length &&
                modifications.map((modification, inx) => (
                  <SwiperSlide key={`modification-${inx}`}>
                    <Modification
                      className={`${selectedModification === modification ? styles.modificationSelected : ""}`}
                      onClick={() => setSelectedModification(modification)}
                    >
                      {modification}
                    </Modification>
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className={`${styles.actions}`}>
              <button className={`${styles.addToCartButton}`}>
                Add to cart ${price}
              </button>

              <Link href="">More information</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Modification = ({ children, ...props }: ModificationProps) => {
  return (
    <div
      {...props}
      className={`${styles.modification} ${props.className}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};
