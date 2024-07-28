import Cart from "./Cart";
import ListProducts from "./ListProducts";

export default function HomeShop({ getCart, getBill }) {
  return (
    <div className="home-shop">
      <ListProducts getCart={getCart} />
      <Cart getBill={getBill} />
    </div>
  );
}
