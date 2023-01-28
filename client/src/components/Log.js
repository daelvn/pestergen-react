import FormLabel from "@mui/joy/FormLabel";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
import LogInput from "./LogInput";
import { useState } from "react";
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

function LogHolder({ lines }) {
  const styles = reactCSS({
    default: {
      holder: {
        padding: 7,
      },
      line: {
        fontFamily: "Courier New, monospace",
        fontWeight: "bold",
      },
      narrator: {
        fontFamily: "Courier New, monospace",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
  });

  const spans = lines.map((line, index) => {
    return (
      <div
        style={{ color: rgbToHex(line.color.r, line.color.g, line.color.b), textAlign: line.interventionType === "narrator" ? "center" : "none" }}
        key={index}
      >
        <span style={line.interventionType === "narrator" ? styles.narrator : styles.line}>
          {line.interventionType === "character" ? `${line.intervention}: ${line.line}` : line.line}
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

export default function Log({ formData, setFormData }) {
  const [lines, setLines] = useState([]);

  function handleAdd(line) {
    setLines(lines.concat([line]));
    setFormData({ ...formData, lines: lines.concat([line]) });
  }

  function handleDeleteLast() {
    setLines(lines.slice(0, -1));
    setFormData({ ...formData, lines: lines.slice(0, -1) });
  }

  function handleDeleteAll() {
    setLines([]);
    setFormData({ ...formData, lines: [] });
  }

  function handleSetLines(lns) {
    setLines(lns);
    setFormData({ ...formData, lines: lns });
  }

  return (
    <div>
      <FormLabel>Log</FormLabel>
      <LogHolder lines={lines} />
      <Divider sx={{ margin: 2 }} />
      <LogInput lines={lines} setLines={handleSetLines} handleAdd={handleAdd} handleDeleteLast={handleDeleteLast} handleDeleteAll={handleDeleteAll} />
    </div>
  );
}
