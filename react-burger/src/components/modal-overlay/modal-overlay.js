import PropTypes from "prop-types"

import styles from "./modal-overlay.module.css"


const ModalOverlay = ({closeModal, children}) => {
    return (
        <div className={styles.modal_overlay} onClick={() => closeModal()}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired, 
    children: PropTypes.element.isRequired, 
}

export default ModalOverlay