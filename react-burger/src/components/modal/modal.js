import PropTypes from "prop-types"

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay"

import styles from "./modal.module.css"


const Modal = ({open, setOpen, header, children}) => {
    if (!open) return null

    return (
        <ModalOverlay setOpen={setOpen}>
            <div className={styles.modal}>
                <div className={`pl-10 pr-10 pt-10 ${styles.header_container}`}>
                    <div className="text text_type_main-large">{header}</div>
                    <CloseIcon onClick={() => setOpen(false)}/>
                </div>
                {children}
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    setOpen: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    header: PropTypes.string
}

export default Modal