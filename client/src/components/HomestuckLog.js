import { useState } from "react";
import reactCSS from "reactcss";

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export default function HomestuckLog({ lines }) {
  const [openLogs, setOpenLogs] = useState({});

  const styles = reactCSS({
    default: {
      holder: {
        padding: "1%",
      },
      line: {
        fontFamily: "Courier New, monospace",
        fontWeight: "bold",
      },
      narrator: {
        fontFamily: "Courier New, monospace",
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 10,
      },
    },
  });

  function groupLines(lns) {
    if (lns.length < 1) return [];
    let groups = [];
    let group = { type: "", lines: [] };
    let lastType = "";

    let elem = lns.shift();
    //console.log("groupLines", lns, elem);
    lastType = elem.interventionType;
    group.type = elem.interventionType;
    group.lines.push(elem);
    if (lns.length < 1) {
      groups.push(group);
      return groups;
    }
    while (elem !== undefined) {
      elem = lns.shift();
      //console.log("elem", elem);
      if (elem === undefined) break;
      if (elem.interventionType === lastType) {
        group.lines.push(elem);
      } else {
        groups.push(group); // push prev
        group = { type: elem.interventionType, lines: [elem] }; // reset and add current
      }
      lastType = elem.interventionType;
    }
    groups.push(group); // push last group
    return groups;
  }

  let groups = groupLines([...lines]);
  let blocks = [];
  for (let [i, el] of groups.entries()) {
    switch (el.type) {
      case "character":
        const dialogue = el.lines.map((line, index) => {
          return (
            <div style={{ color: rgbToHex(line.color.r, line.color.g, line.color.b) }}>
              <span style={styles.line}>
                {line.intervention}: {line.line}
              </span>
            </div>
          );
        });
        //setOpenLogs({ ...openLogs, [i]: false });
        blocks.push(
          <div className="type-center mar-x-0 mar-x-hs-md--md mar-b-hs-lg o_chat-container" style={{ marginTop: 15, textAlign: "left" }} key={i}>
            <button
              style={{ width: "20%", marginLeft: "40%" }}
              className="o_chat-log-btn"
              onClick={() => {
                setOpenLogs({ ...openLogs, [i]: !openLogs[i] });
              }}
            >
              {openLogs[i] ? "Hide" : "Show"} pesterlog
            </button>
            {openLogs[i] ? <div style={{ padding: "5%" }}>{dialogue}</div> : null}
          </div>
        );
        break;
      case "narrator":
        blocks.push(
          el.lines.map((line, index) => {
            return (
              <div style={{ color: rgbToHex(line.color.r, line.color.g, line.color.b) }} key={index}>
                <p style={styles.narrator}>{line.line}</p>
              </div>
            );
          })
        );
        break;
      default:
        break;
    }
  }

  return <div style={styles.holder}>{blocks}</div>;
}
