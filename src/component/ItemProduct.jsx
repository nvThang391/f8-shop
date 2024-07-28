import { useContext } from "react";
import { ProviderContext } from "../store/Provider";
export default function ItemProduct({ getCart }) {
  const { state } = useContext(ProviderContext);
  const { products } = state;
  return products.map(({ name, price, image, _id }, index) => {
    return (
      <div className="item-product" key={index}>
        <img src={image} />
        <h2 className="name-item">{name}</h2>
        <div className="add-to-card">
          <div className="price">${price}</div>
          <button
            className="btn-AddtoCard"
            onClick={() => {
              getCart(_id);
            }}
          >
            Add to card
          </button>
        </div>
      </div>
    );
  });
}
/*
    {image ,name  ,quantity ,price}
*/
