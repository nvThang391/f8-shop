import { useContext } from "react";
import { ProviderContext } from "../store/Provider";
export default function Cart({ getBill }) {
  const { state } = useContext(ProviderContext);
  const { inCart, cartStatus } = state;
  return cartStatus ? (
    <div className="cart-shop">
      <table>
        <thead>
          <tr>
            <th>Tên Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Tồn Kho</th>
            <th>Tổng Tiền</th>
          </tr>
        </thead>
        <tbody>
          {inCart.map(({ name, quantity, price, total }, index) => {
            return (
              <tr key={index}>
                <td className="name-item-cart">{name}</td>
                <td>{total}</td>
                <td>{quantity}</td>
                <td>{price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn-pay" onClick={getBill}>
        Thanh Toán
      </button>
    </div>
  ) : (
    <h2 className="notice">Chưa có sản phẩm nào!!</h2>
  );
}
