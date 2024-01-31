import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./modal.module.css"


const Modal = ({setOpen, children, header}) => {
    return (
        <div className={styles.modal}>
            <div className={`pl-10 pr-10 pt-10`}>
                <div className={styles.header_caption}>
                    {header}
                </div>
                <div className={styles.header_close_button}>
                    <CloseIcon onClick={() => setOpen(false)}/>
                </div>
            </div>
            
            {children}
        </div>
    )
}

export default Modal