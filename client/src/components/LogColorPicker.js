import { useState } from "react";
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

function LogColorPickerSwatch({ color, handleChange, handleClose }) {
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
      <div style={styles.cover} onClick={handleClose} />
      <TwitterPicker colors={DEFAULT_COLORS} color={color} onChange={handleChange} />
    </div>
  );
}

export default function LogColorPicker({ handleChangeParent }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({ r: 255, g: 0, b: 0, a: 1 });

  function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function handleClose() {
    setDisplayColorPicker(false);
  }

  function handleChange(newColor) {
    handleChangeParent({ target: { name: "color", value: newColor.rgb } });
    setColor(newColor.rgb);
  }

  return (
    <div>
      <Button
        sx={{
          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          color: findContrast(color),
        }}
        onClick={handleClick}
      >
        Pick color
      </Button>
      {displayColorPicker ? <LogColorPickerSwatch color={color} handleChange={handleChange} handleClose={handleClose} /> : null}
    </div>
  );
}
