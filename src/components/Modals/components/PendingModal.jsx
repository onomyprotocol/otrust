import LoadingSpinner from 'components/UI/LoadingSpinner';

import * as Modal from '../styles';

export default function PendingModal() {
  return (
    <Modal.Wrapper>
      <main>
        <Modal.PendingCaption>Transaction pending...</Modal.PendingCaption>
        <Modal.PendingDescription>
          Please wait while transaction is been handled by the blockchain system
        </Modal.PendingDescription>
      </main>
      <footer>
        <Modal.LoadingWrapper>
          <LoadingSpinner />
        </Modal.LoadingWrapper>
      </footer>
    </Modal.Wrapper>
  );
}
