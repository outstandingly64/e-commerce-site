import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { id, stock, colors } = product;
  const { addToCart } = useCartContext();
  const [mainColor, setMainColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  // reminder: addToCart() function takes in id, mainColor, quantity and product as arguments

  const colorDisplay = colors.map((color, index) => {
    return (
      <button
        key={index}
        className={`${mainColor === color ? "color-btn active" : "color-btn"}`}
        style={{ background: color }}
        onClick={() => setMainColor(color)}
      >
        {mainColor === color ? <FaCheck /> : null}
      </button>
    );
  });

  const increaseQuantity = () => {
    setQuantity((oldQuantity) => {
      return oldQuantity + 1 > stock ? oldQuantity : oldQuantity + 1;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((oldQuantity) => {
      return oldQuantity - 1 < 1 ? 1 : oldQuantity - 1;
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors: </span>
        <div>{colorDisplay}</div>
      </div>
      <div className="btn-container">
        <AmountButtons
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, mainColor, quantity, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
