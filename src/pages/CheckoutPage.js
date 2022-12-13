import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <main>
      <PageHero title={`checkout`} />
      <Wrapper className="page">
        <h1>
          CHECKOUT: Ut lobortis mollis nibh, nec accumsan est feugiat sed. Aliquam pretium
          mi nulla, laoreet feugiat lectus finibus eget. Morbi tempus libero et
          diam aliquam, ut fringilla dui aliquam. Fusce dictum ante eros, vel
          bibendum mauris sagittis in.{" "}
        </h1>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
