import styled from 'styled-components';
import Exchange from 'components/Exchange/Exchange';

import { responsive } from 'theme/constants';
import { Panel } from 'components/UI';
import Chart from 'components/Chart/Chart';

const ContentLayout = styled.div`
  display: grid;
  grid-template-rows: auto auto;

  @media screen and (max-width: ${responsive.laptop}) {
    grid-template-rows: auto auto;
  }
`;

export default function Bonding() {
  return (
    <Panel>
      <ContentLayout>
        <Chart />
        <Exchange />
      </ContentLayout>
    </Panel>
  );
}
