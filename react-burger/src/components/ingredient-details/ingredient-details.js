import ModalOverlay from "../modal-overlay/modal-overlay";


const IngredientDetails = ({open, setOpen}) => {
    return (
        <ModalOverlay 
            open={open} 
            setOpen={setOpen}
        >
            <h1>Diveev Test</h1>
        </ModalOverlay>
    )
}

export default IngredientDetails;