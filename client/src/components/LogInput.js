import { useState } from "react";

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Modal, ModalDialog, Typography, Divider, Box } from "@mui/joy";

import LogColorPicker from "./LogColorPicker";
import LogExportModal from "./LogExport";
import LogImportModal from "./LogImport";

function ConfirmDeleteButton({ handleDeleteAll }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)} sx={{ width: "100%" }}>
        Delete everything
      </Button>
      <Modal aria-labelledby="alert-dialog-modal-title" aria-describedby="alert-dialog-modal-description" open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <Typography id="alert-dialog-modal-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
            Are you sure?
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary" mb={3}>
            Are you sure you want to delete all the lines?
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                handleDeleteAll();
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}

function LogInputButton({ handleClick }) {
  return <Button onClick={handleClick}>Insert</Button>;
}

export default function LogInput({ lines, setLines, handleAdd, handleDeleteLast, handleDeleteAll }) {
  const [color, setColor] = useState({ r: 255, g: 0, b: 0, a: 1 });
  const [intervention, setIntervention] = useState("");
  const [interventionType, setInterventionType] = useState("character");
  const [line, setLine] = useState("");

  function handleCreate() {
    handleAdd({ color: color, interventionType: interventionType, intervention: intervention, line: line });
    // reset some
    setLine("");
    document.getElementById("log-input-line").value = "";
  }

  function handleChange(event) {
    if (event.target.nodeName === "LI") {
      setInterventionType(document.querySelectorAll('[name="interventionType"]')[1].value === "narrator" ? "character" : "narrator");
    } else if (event.target.name === "color") {
      setColor(event.target.value);
    } else if (event.target.name === "intervention") {
      setIntervention(event.target.value);
    } else if (event.target.name === "line") {
      setLine(event.target.value);
    }
  }

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
      <Grid sm={2} xs={12}>
        <LogColorPicker name="color" handleChangeParent={handleChange} />
      </Grid>
      <Grid sm={7} xs={12}>
        <Input name="intervention" id="log-input-intervention" placeholder="Character/Handle" onChange={handleChange} />
      </Grid>
      <Grid sm={3} xs={12}>
        <Select name="interventionType" id="log-input-intervention-type" placeholder="Type..." defaultValue="character" onChange={handleChange}>
          <Option value="character">Character</Option>
          <Option value="narrator">Narrator</Option>
        </Select>
      </Grid>
      <Grid xs={12}>
        <Input
          name="line"
          id="log-input-line"
          placeholder="Insert next line here"
          endDecorator={<LogInputButton handleClick={handleCreate} />}
          onChange={handleChange}
        />
      </Grid>
      <Grid sm={6} xs={12}>
        <Button variant="outlined" color="danger" sx={{ width: "100%" }} onClick={handleDeleteLast}>
          Delete last line
        </Button>
      </Grid>
      <Grid sm={6} xs={12}>
        <ConfirmDeleteButton handleDeleteAll={handleDeleteAll} />
      </Grid>
      <Grid sm={6} xs={12}>
        <LogExportModal lines={lines} />
      </Grid>
      <Grid sm={6} xs={12}>
        <LogImportModal setLines={setLines} />
        {/* Do popup with code to put in a file */}
      </Grid>
    </Grid>
  );
}
