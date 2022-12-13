import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title={`about`}/>
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut
            ullamcorper libero. Suspendisse rhoncus, purus vitae molestie
            cursus, urna ante luctus enim, ac euismod ex nunc vel velit. Donec
            pulvinar lobortis facilisis. Phasellus luctus mauris vel bibendum
            posuere. Integer venenatis nibh sodales diam lacinia, at semper
            ligula egestas. Donec iaculis consectetur quam. Phasellus vel
            pharetra diam. Nulla aliquet vulputate odio ac finibus. Etiam in
            arcu nec nibh tempus faucibus. Nulla malesuada magna at porttitor
            hendrerit. Donec id magna vulputate, sodales purus nec, rhoncus
            magna. Etiam sit amet rhoncus lacus. Integer tempor tristique velit
            at convallis. Proin ullamcorper, nibh vitae suscipit finibus, mi
            dolor congue turpis, in vulputate felis odio id libero. Sed blandit
            diam libero, id auctor ligula tempor sit amet. Cras a lacus eget
            erat dapibus scelerisque. Aliquam fermentum urna sit amet facilisis
            tristique. Curabitur quis placerat metus. Proin laoreet purus
            sagittis luctus ullamcorper. Pellentesque suscipit vitae tellus non
            consequat. Praesent imperdiet nec leo sed facilisis. Phasellus diam
            nisl, auctor id odio eget, blandit commodo lacus. Proin quis
            fermentum lacus.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
