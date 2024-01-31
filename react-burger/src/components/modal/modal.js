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

export default Modal