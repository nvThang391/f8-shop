import ItemProduct from "./ItemProduct";
export default function ListProducts({ getCart }) {
  return (
    <>
      <h1>Welcome to Shop</h1>
      <div className="list-products">
        <ItemProduct getCart={getCart} />
      </div>
    </>
  );
}
