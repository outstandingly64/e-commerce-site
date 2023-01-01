import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

/**
 * This component communicates with Stipe via the Netlfiy
 * serverless functions created. It is not secure to
 * communciate to Stripe directly from the component itself.
 */
const CheckoutPage = () => {
  const { cart } = useCartContext();

  const emptyCart = (
    <div className="empty">
      <h2>Your cart is empty!</h2>
      <Link to="/products" className="btn">
        Shop Products
      </Link>
    </div>
  );

  return (
    <main>
      <PageHero title={`checkout`} />
      <Wrapper className="page">
        {cart.length < 1 ? emptyCart : <StripeCheckout />}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
