import { createPortal } from "react-dom"
import Modal from "../modal/modal"
import styles from "./modal-overlay.module.css"


const modalRoot = document.getElementById("react-modals")

const ModalOverlay = ({open, setOpen, children}) => {
    const handleOnClick = () => {
        setOpen(false)
    }

    const jsx = <div className={styles.modal_overlay} onClick={handleOnClick}>
        <Modal open={open} setOpen={setOpen} children={children}/>
    </div>

    if (!open) return null;

    return createPortal(jsx, modalRoot);
}

export default ModalOverlay