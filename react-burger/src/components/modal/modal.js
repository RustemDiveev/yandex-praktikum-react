import { createPortal } from "react-dom"


const modalRoot = document.getElementById("react-modals")

const Modal = ({open, children}) => {
    if (!open) return null

    const modalLayout = <div style={{width: 200, height: 300}}>
        {children}
    </div>

    return createPortal(modalLayout, modalRoot)
}

export default Modal