import styled from "styled-components";

// Components
import AcctDash from "components/AcctDash";
import Bonding from "components/Bonding";
import { Container } from "components/UI";
import { responsive } from "theme/constants";

const BondingCurveLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 375px;
  gap: 6px;

  padding-bottom: 150px;

  @media screen and (max-width: ${responsive.laptop}) {
    grid-template-columns: 1fr 290px;
  }

  @media screen and (max-width: ${responsive.laptopSmall}) {
    grid-template-columns: 1fr 250px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    display: flex;
    flex-direction: column-reverse;
    grid-template-columns: none;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    gap: 0;
    flex-direction: column;

    padding: 0;
  }
`;

export default function BondingCurve() {
  return (
    <Container>
      <BondingCurveLayout>
        <AcctDash />
        <Bonding />
      </BondingCurveLayout>
    </Container>
  );
}
