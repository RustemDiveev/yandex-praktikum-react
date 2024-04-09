import { FC, ReactNode } from "react"

import styles from "./modal-overlay.module.css"

type tModalOverlay = {
    closeModal: Function
    children: ReactNode
}


const ModalOverlay: FC<tModalOverlay> = ({closeModal, children}) => {
    return (
        <div className={styles.modal_overlay} onClick={() => closeModal()}>
            {children}
        </div>
    )
}

export default ModalOverlay