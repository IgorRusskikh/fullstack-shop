import ProductCard from "../ProductCard";
import styles from "./ProductsGrid.module.css";

export default function ProductsGrid() {
  return (
    <div className={`${styles.productsGrid} container`}>
      {Array.from({ length: 5 }).map((_, inx) => (
        <ProductCard
          key={`${inx}`}
          title="Coffee"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloribus sequi ducimus tempora minima. Voluptates quod laborum voluptatem, facilis accusantium reiciendis maxime nihil architecto aliquam officia impedit odit a sapiente."
          price="9.99"
          modifications={["cinnamon", "vanilla", "chocolate", "strawberry"]}
        />
      ))}
    </div>
  );
}
