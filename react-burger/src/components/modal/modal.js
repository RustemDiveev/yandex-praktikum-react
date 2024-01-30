import styles from "./modal.module.css"


const Modal = ({open, setOpen, children}) => {
    return (
        <div className={styles.modal}>
            {children}
        </div>
    )
}

export default Modal