import { useState } from "react";

import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import LogColorPicker from "./LogColorPicker";
import LogExportModal from "./LogExport";
import LogImportModal from "./LogImport";

function LogInputButton({ handleClick }) {
  return <Button onClick={handleClick}>Insert</Button>;
}

export default function LogInput({ lines, setLines, handleAdd, handleDeleteLast, handleDeleteAll }) {
  const [color, setColor] = useState({ r: 255, g: 0, b: 0, a: 1 });
  const [intervention, setIntervention] = useState("");
  const [interventionType, setInterventionType] = useState("");
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
      console.log(`change color:`, event.target.value);
      setColor(event.target.value);
    } else if (event.target.name === "intervention") {
      setIntervention(event.target.value);
    } else if (event.target.name === "line") {
      setLine(event.target.value);
    }
  }

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
      <Grid xs={2}>
        <LogColorPicker name="color" handleChangeParent={handleChange} />
      </Grid>
      <Grid xs={7}>
        <Input name="intervention" id="log-input-intervention" placeholder="Character/Handle" onChange={handleChange} />
      </Grid>
      <Grid xs={3}>
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
      <Grid xs={6}>
        <Button color="danger" sx={{ width: "100%" }} onClick={handleDeleteLast}>
          Delete last line
        </Button>
      </Grid>
      <Grid xs={6}>
        <Button color="danger" sx={{ width: "100%" }} onClick={handleDeleteAll}>
          Delete everything
        </Button>
      </Grid>
      <Grid xs={6}>
        <LogExportModal lines={lines} />
      </Grid>
      <Grid xs={6}>
        <LogImportModal setLines={setLines} />
        {/* Do popup with code to put in a file */}
      </Grid>
    </Grid>
  );
}
