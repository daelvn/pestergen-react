import React from "react";
import reactCSS from "reactcss";
import { TwitterPicker } from "react-color";
import Button from "@mui/joy/Button";

const DEFAULT_COLORS = [
  "#0715cd",
  "#b536da",
  "#e00707",
  "#4ac925",

  "#00d5f2",
  "#f141ef",
  "#f2a400",
  "#1f9400",

  "#626262",
  "#ff0000",
  "#a10000",
  "#a15000",
  "#a1a100",
  "#416600",
  "#008141",
  "#008282",
  "#005682",
  "#000056",
  "#2b0057",
  "#6a006a",
  "#77003c",

  "#929292",
  "#323232",
  "#2ed73a",
];

function findContrast(rgb) {
  // http://www.w3.org/TR/AERT#color-contrast
  const brightness = Math.round((parseInt(rgb.r) * 299 + parseInt(rgb.g) * 587 + parseInt(rgb.b) * 114) / 1000);
  const textColour = brightness > 125 ? "black" : "white";
  return textColour;
}

class LogColorPickerSwatch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = reactCSS({
      default: {
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          minHeight: "100%",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });
    return (
      <div style={styles.popover}>
        {/* <div style={styles.cover} onClick={this.props.handleClose} /> */}
        <TwitterPicker colors={DEFAULT_COLORS} color={this.props.color} onChange={this.props.handleChange} />
      </div>
    );
  }
}

export default class LogColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: {
        r: "255",
        g: "0",
        b: "0",
        a: "1",
      },
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    //this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    console.log(`handling color! ${color}`);
    this.props.handleChange({ target: { name: "color", value: color } });
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        button: {},
      },
    });

    return (
      <div>
        <Button
          sx={{
            backgroundColor: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
            color: findContrast(this.state.color),
          }}
          onClick={this.handleClick}
        >
          Pick color
        </Button>
        {this.state.displayColorPicker ? (
          <LogColorPickerSwatch color={this.state.color} handleChange={this.handleChange} handleClose={this.handleClose} />
        ) : null}
      </div>
    );
  }
}
