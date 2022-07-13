import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { HighlightButton } from "../../buttons/highlight_button";
import { StandardButton } from "../../buttons/standard_button";


const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <StandardButton
          variant="contained"
          onClick={() => setOpen(false)}
        >
          No
        </StandardButton>
        <HighlightButton
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </HighlightButton>
      </DialogActions>
    </Dialog>
  );
};export default ConfirmDialog;