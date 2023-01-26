import Textarea from "@mui/joy/Textarea";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
import LogInput from "./LogInput";
import React from "react";
import reactCSS from "reactcss";

// Log structure
// -------------
// Log {
//   lines: [
//     {color: {r: Number, g: Number, b: Number}, intervention: String, interventionType: String, line: String}
//   ]
// }

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

class LogHolder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = reactCSS({
      default: {
        holder: {
          padding: 7,
        },
        line: {
          fontFamily: "Courier New, monospace",
          fontWeight: "bold",
        },
      },
    });

    const spans = this.props.lines.map((line) => {
      return (
        <div style={{ color: rgbToHex(line.color.r, line.color.g, line.color.b) }}>
          <span style={styles.line}>
            {line.intervention}: {line.line}
          </span>
          <br />
        </div>
      );
    });

    const holder = (
      <Sheet variant="soft">
        <div style={styles.holder}>{spans}</div>
      </Sheet>
    );
    return holder;
  }
}

export default class Log extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
    };
  }

  handleAdd = (line) => {
    this.setState({ lines: this.state.lines.concat([line]) });
  };

  handleDeleteLast = () => {
    let stateClone = { ...this.state };
    stateClone.lines.pop();
    this.setState(stateClone);
  };

  handleDeleteAll = () => {
    this.setState({ lines: [] });
  };

  render() {
    return (
      <div>
        <FormLabel>Log</FormLabel>
        <LogHolder lines={this.state.lines} />
        <Divider sx={{ margin: 2 }} />
        <LogInput handleAdd={this.handleAdd} handleDeleteLast={this.handleDeleteLast} handleDeleteAll={this.handleDeleteAll} />
      </div>
    );
  }
}
