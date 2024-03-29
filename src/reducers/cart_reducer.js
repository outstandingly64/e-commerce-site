import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, quantity, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newQuantity = cartItem.quantity + quantity;
          if (newQuantity > cartItem.max) {
            newQuantity = cartItem.max;
          }
          return { ...cartItem, quantity: newQuantity };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        quantity,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const { payload: itemIdToRemove } = action;
    const tempCart = state.cart.filter((item) => item.id !== itemIdToRemove);
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "increase") {
          let newQuantity =
            item.quantity + 1 > item.max ? item.max : item.quantity + 1;
          return { ...item, quantity: newQuantity };
        }

        if (value === "decrease") {
          let newQuantity = item.quantity - 1 < 1 ? 1 : item.quantity - 1;
          return { ...item, quantity: newQuantity };
        }
      } 
        return item;
      
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_quantity } = state.cart.reduce(
      (total, cartItem) => {
        const { quantity, price } = cartItem;

        total.total_items += quantity;
        total.total_quantity += price * quantity;
        return total;
      },
      { total_items: 0, total_quantity: 0 }
    );

    return { ...state, total_items, total_quantity };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
