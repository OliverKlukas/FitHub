import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function CreateCategory(props) {
    const [openDialog, setOpenDialog] = React.useState(props.openDialog);
    const [newCategoryName, setNewCategoryName] = React.useState("");

    const handleDialogClose = () => {
        props.setOpenDialog(false); // Use the prop.
    };

    const handleAddCategory = (categoryName) => {};

    const handleCategoryNameChange = (e) => {
        setNewCategoryName(e.target.value);
    };

    return (
        <Dialog
            fullWidth
            maxWidth={"sm"}
            open={props.openDialog} // Use value directly here
            onClose={handleDialogClose}
        >
            <DialogTitle>Create Video Category</DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
                <Button>Add Category</Button>
                <Button variant="outlined" onClick={handleDialogClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
