import { Modal } from '@/components';

type Props = {
  openModal: boolean
  onCloseModal: () => void
  selectedImage: string
}

export const ImageModal = ({openModal, onCloseModal, selectedImage}: Props) => {

  return (
    <Modal openModal={openModal} onCloseModal={onCloseModal}>
      <img src={selectedImage} alt="Large Character" style={{ width: 'auto', height: '100%', objectFit: 'contain' }}/>
    </Modal>
  )
}