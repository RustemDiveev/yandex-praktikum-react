import PropTypes from "prop-types"

import { useEffect } from "react"
import { createPortal } from "react-dom"

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay"

import styles from "./modal.module.css"


const modalRoot = document.getElementById("react-modals")

const Modal = ({setOpen, header, children}) => {

    const handleOnPressEscape = (e) => {
        if (e.key === "Escape") setOpen(false)
    }

    const jsx = 
        <ModalOverlay setOpen={setOpen}>
            <div className={styles.modal}>
                <div className={`pl-10 pr-10 pt-10 ${styles.header_container}`}>
                    <div className="text text_type_main-large">{header}</div>
                    <CloseIcon onClick={() => setOpen(false)}/>
                </div>
                {children}
            </div>
        </ModalOverlay>

    useEffect(() => {
        document.addEventListener("keydown", handleOnPressEscape)
        return () => document.removeEventListener("keydown", handleOnPressEscape)
    }, [])
    
    return createPortal(jsx, modalRoot)
}

Modal.propTypes = {
    setOpen: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    header: PropTypes.string
}

export default Modal 