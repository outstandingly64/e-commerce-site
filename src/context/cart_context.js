import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorageCart = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    // if there is item(s) in the cart, parse and return them
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return []; // if empty cart, return an empty cart
  }
};

const initialState = {
  cart: getLocalStorageCart(),
  total_items: 0,
  total_quantity: 0,
  shipping_fee: 499,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //addToCart
  const addToCart = (id, color, quantity, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, quantity, product } });
  };

  const removeItem = (id) => {
      dispatch({type: REMOVE_CART_ITEM, payload: id});
  };
  
  const toggleAmount = (id, value) => {
    console.log(id, value);
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}});
  };

  const clearCart = () => {
    dispatch({type: CLEAR_CART});
  };

  useEffect(() => {
    dispatch({type: COUNT_CART_TOTALS});
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
