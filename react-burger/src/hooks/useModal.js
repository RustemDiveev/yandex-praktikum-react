import { useState, useCallback } from "react"

const useModal = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const openModal = useCallback(() => setModalOpen(true), [])
    const closeModal = useCallback(() => setModalOpen(false), [])

    return {modalOpen, openModal, closeModal}
}

export default useModal