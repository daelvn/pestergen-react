import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import LogColorPicker from "./LogColorPicker";
import LogExportModal from "./LogExport";
import React from "react";
import LogImportModal from "./LogImport";

class LogInputButton extends React.Component {
  render() {
    return <Button onClick={this.props.handleClick}>Insert</Button>;
  }
}

export default class LogInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: { r: 255, g: 0, b: 0, a: 1 },
      intervention: "",
      interventionType: "character",
      line: "",
    };
  }

  handleCreate = () => {
    var line = { ...this.state };
    this.props.handleAdd(line);
    // reset some
    let stateClone = { ...this.state };
    stateClone.line = "";
    this.setState(stateClone);
    document.getElementById("log-input-line").value = "";
  };

  handleChange = (event) => {
    let stateClone = { ...this.state };
    //console.log(event);
    if (event.target.nodeName === "LI") {
      stateClone["interventionType"] = document.querySelectorAll('[name="interventionType"]')[1].value === "narrator" ? "character" : "narrator";
    } else if (event.target.name === "color") {
      stateClone["color"] = event.target.value.rgb;
    } else {
      stateClone[event.target.name] = event.target.value;
    }
    //console.log(stateClone);
    this.setState(stateClone);
  };

  render() {
    return (
      <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
        <Grid xs={2}>
          <LogColorPicker name="color" handleChange={this.handleChange} />
        </Grid>
        <Grid xs={7}>
          <Input name="intervention" id="log-input-intervention" placeholder="Character/Handle" onChange={this.handleChange} />
        </Grid>
        <Grid xs={3}>
          <Select name="interventionType" id="log-input-intervention-type" placeholder="Type..." defaultValue="character" onChange={this.handleChange}>
            <Option value="character">Character</Option>
            <Option value="narrator">Narrator</Option>
          </Select>
        </Grid>
        <Grid xs={12}>
          <Input
            name="line"
            id="log-input-line"
            placeholder="Insert next line here"
            endDecorator={<LogInputButton handleClick={this.handleCreate} />}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid xs={6}>
          <Button color="danger" sx={{ width: "100%" }} onClick={this.props.handleDeleteLast}>
            Delete last line
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button color="danger" sx={{ width: "100%" }} onClick={this.props.handleDeleteAll}>
            Delete everything
          </Button>
        </Grid>
        <Grid xs={6}>
          <LogExportModal lines={this.props.lines} />
        </Grid>
        <Grid xs={6}>
          <LogImportModal setLines={this.props.setLines} />
          {/* Do popup with code to put in a file */}
        </Grid>
      </Grid>
    );
  }
}
