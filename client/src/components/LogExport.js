import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";

export default function LogExportModal({ lines }) {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div>
      <Button sx={{ width: "100%" }} onClick={openModal}>
        Export
      </Button>
      <Modal open={open} onClose={closeModal} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Sheet
          sx={{
            width: "55%",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="soft"
            sx={{
              //top: "calc(-1/4 * var(--IconButton-size))",
              //right: "calc(-1/4 * var(--IconButton-size))",
              //boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
            Export pesterlog
          </Typography>
          <p>Save this code to a text file and put it back again in the Import dialog to load it.</p>
          <Textarea maxRows={15} value={JSON.stringify(lines)} />
        </Sheet>
      </Modal>
    </div>
  );
}
