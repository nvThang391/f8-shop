export const initialState = {
  products: [],
  inCart: [],
  cartStatus: false,
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "shop/getProducts":
      return { ...state, products: action.payload };
    case "shop/addToCart":
      return { ...state, inCart: [...state.inCart, action.payload] };
    case "shop/addQuantity":
      return { ...state, inCart: action.payload };
    case "shop/getCart":
      return { ...state, cartStatus: action.payload };
    case "shop/getBill":
      return {
        ...state,
        cartStatus: action.payload.setStatusCart,
        inCart: action.payload.resetCart,
      };
  }
};
