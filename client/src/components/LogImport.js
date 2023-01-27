import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";

export default function LogImportModal({ setLines }) {
  const [open, setOpen] = useState(false);
  const [imported, setImported] = useState("[]");

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleChange(event) {
    setImported(JSON.parse(event.target.value));
  }

  function handleImport() {
    setLines(imported);
  }

  return (
    <div>
      <Button sx={{ width: "100%" }} onClick={openModal}>
        Import
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
            Import pesterlog
          </Typography>
          <p>Paste the code you got with the Export button here.</p>
          <Textarea maxRows={15} onChange={handleChange} />
          <Divider />
          <Button sx={{ width: "100%" }} onClick={handleImport}>
            Import
          </Button>
        </Sheet>
      </Modal>
    </div>
  );
}
