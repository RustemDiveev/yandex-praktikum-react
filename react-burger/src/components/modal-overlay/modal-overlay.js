import PropTypes from "prop-types"

import { createPortal } from "react-dom"

import styles from "./modal-overlay.module.css"


const modalRoot = document.getElementById("react-modals")

const ModalOverlay = ({setOpen, children}) => {

    const jsx = <div className={styles.modal_overlay} onClick={() => setOpen(false)}>
        {children}
    </div>

    return createPortal(jsx, modalRoot);
}

ModalOverlay.propTypes = {
    setOpen: PropTypes.func.isRequired, 
    children: PropTypes.elementType.isRequired, 
}

export default ModalOverlay