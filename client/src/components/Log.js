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
    },
  });

  const spans = lines.map((line, index) => {
    console.log(line);
    return (
      <div style={{ color: rgbToHex(line.color.r, line.color.g, line.color.b) }} key={index}>
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

export default function Log() {
  const [lines, setLines] = useState([]);

  function handleAdd(line) {
    setLines(lines.concat([line]));
  }

  function handleDeleteLast() {
    setLines(lines.slice(0, -1));
  }

  function handleDeleteAll() {
    setLines([]);
  }

  return (
    <div>
      <FormLabel>Log</FormLabel>
      <LogHolder lines={lines} />
      <Divider sx={{ margin: 2 }} />
      <LogInput lines={lines} setLines={setLines} handleAdd={handleAdd} handleDeleteLast={handleDeleteLast} handleDeleteAll={handleDeleteAll} />
    </div>
  );
}
