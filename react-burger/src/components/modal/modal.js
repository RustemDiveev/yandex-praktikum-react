import PropTypes from "prop-types"

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./modal.module.css"


const Modal = ({setOpen, children, header}) => {
    return (
        <div className={styles.modal}>
            <div className={`pl-10 pr-10 pt-10 ${styles.header_container}`}>
                <div className="text text_type_main-large">{header}</div>
                <CloseIcon onClick={() => setOpen(false)}/>
            </div>
            {children}
        </div>
    )
}

Modal.propTypes = {
    setOpen: PropTypes.func,
    children: PropTypes.element,
    header: PropTypes.string
}

export default Modal