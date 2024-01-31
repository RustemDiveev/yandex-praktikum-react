import PropTypes from "prop-types"

import { createPortal } from "react-dom"

import Modal from "../modal/modal"
import styles from "./modal-overlay.module.css"


const modalRoot = document.getElementById("react-modals")

const ModalOverlay = ({open, setOpen, children, header}) => {
    const handleOnClick = () => {
        setOpen(false)
    }

    const jsx = <div className={styles.modal_overlay} onClick={handleOnClick}>
        <Modal open={open} setOpen={setOpen} children={children} header={header}/>
    </div>

    if (!open) return null;

    return createPortal(jsx, modalRoot);
}

ModalOverlay.propTypes = {
    open: PropTypes.bool.isRequired, 
    setOpen: PropTypes.func.isRequired, 
    children: PropTypes.elem.isRequired, 
    header: PropTypes.string
}

export default ModalOverlay