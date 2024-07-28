import { useContext, useEffect, useState } from "react";
import HomeShop from "./component/HomeShop";
import LoginShop from "./component/LoginShop";
import { ProviderContext } from "./store/Provider";
import "./acssets/App.css";
export default function App() {
  const serverApi = "https://api-exercise-sopi.vercel.app/api/v1";
  const { state, dispatch } = useContext(ProviderContext);
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("apiKey")
  );
  //   lay thong tin user de dang nhap
  const getUserProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const response = await fetch(`${serverApi}/api-key?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      localStorage.setItem("email", email);
      localStorage.setItem("apiKey", data.data.apiKey);
      e.target.reset();
      setLoginStatus(localStorage.getItem("apiKey"));
    } else {
      alert("email khong ton tai");
      e.target.reset();
    }
  };
  // lay danh sach san pham de hien thi len UI
  const getProducts = async () => {
    const apiKey = localStorage.getItem("apiKey");
    const response = await fetch(`${serverApi}/products?limit=12`, {
      method: "GET",
      headers: { "X-Api-Key": apiKey },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      dispatch({
        type: "shop/getProducts",
        payload: data.data.listProduct,
      });
    }
  };
  // tao danh sach san pham trong Cart
  const getCart = (id) => {
    const checkCard = state.inCart.find(({ _id }) => {
      return _id === id;
    });
    if (!checkCard) {
      const newItem = state.products.find((item) => item._id === id);
      newItem.total = 1;
      newItem.quantity -= newItem.total;
      dispatch({
        type: "shop/addToCart",
        payload: newItem,
      });
    } else if (checkCard) {
      const oldItem = state.inCart.map((item) => {
        if (item._id === id) {
          item.total += 1;
          item.quantity -= 1;
        }
        return item;
      });
      dispatch({
        type: "shop/addQuantity",
        payload: oldItem,
      });
    }
    dispatch({
      type: "shop/getCart",
      payload: true,
    });
  };
  const getBill = async () => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      const checkBill = state.inCart.map(({ _id, total }) => {
        return {
          productId: _id,
          quantity: total,
        };
      });
      const response = await fetch(`${serverApi}/orders`, {
        method: "POST",
        headers: { "X-Api-Key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify(checkBill),
      });
      if (response.ok) {
        dispatch({
          type: "shop/getBill",
          payload: {
            resetCart: [],
            setStatusCart: false,
          },
        });
        alert("Thanh Toán Thành Công");
      } else {
        if (confirm("Đã có lỗi xảy ra. Bạn có muốn đăng xuất")) {
          localStorage.removeItem("email");
          localStorage.removeItem("apiKey");
          dispatch({
            type: "shop/getBill",
            payload: {
              resetCart: [],
              setStatusCart: false,
            },
          });
          setLoginStatus(localStorage.removeItem("apiKey"));
        }
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="app-shop">
      {loginStatus ? (
        <HomeShop getCart={getCart} getBill={getBill} />
      ) : (
        <LoginShop getUserProfile={getUserProfile} />
      )}
    </div>
  );
}
