import PropTypes from "prop-types"

import styles from "./modal-overlay.module.css"


const ModalOverlay = ({setOpen, children}) => {
    return (
        <div className={styles.modal_overlay} onClick={() => setOpen(false)}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    setOpen: PropTypes.func.isRequired, 
    children: PropTypes.element.isRequired, 
}

export default ModalOverlay