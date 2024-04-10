import { FC, ReactNode } from "react"

import styles from "./modal-overlay.module.css"

type tModalOverlay = {
    closeModal: Function
    children: ReactNode
}


const ModalOverlay: FC<tModalOverlay> = ({closeModal, children}) => {
    const handleCloseModal = () => {closeModal()}

    return (
        <div className={styles.modal_overlay} onClick={handleCloseModal}>
            {children}
        </div>
    )
}

export default ModalOverlay