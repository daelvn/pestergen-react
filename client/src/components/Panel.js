import FormLabel from "@mui/joy/FormLabel";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";

import "../index.css";

import { useState } from "react";
import reactCSS from "reactcss";

export default function Panel({ oldLog, formData, setFormData, file, setFile }) {
  //const [fetched, setFetched] = useState(false);
  const [localFile, localSetFile] = useState("/static/img/panel.png");
  const [hover, setHover] = useState(false);
  if (!file) {
    [file, setFile] = [localFile, localSetFile];
  }

  const styles = reactCSS({
    default: {
      panel: {
        width: "75%",
        margin: "auto",
      },
      coverContain: {
        objectFit: "contain",
      },
    },
  });

  function handleButtonClick() {
    document.getElementById("input-panel-image").click();
  }

  function handlePanelClick() {
    setHover(!hover);
  }

  function handleChange(event) {
    setFile(URL.createObjectURL(event.target.files[0]));
    setFormData({ ...formData, panel: event.target.files[0] });
  }

  // if (oldLog && !fetched) {
  //   setFile(oldLog.panel);
  //   setFormData({ ...formData, panel: oldLog.panel });
  //   setFetched(true);
  // }

  return (
    <div style={styles.panel}>
      <FormControl>
        <FormLabel>Panel</FormLabel>
        <Card sx={{ aspectRatio: "13 / 9" }}>
          <CardCover sx={hover ? styles.coverContain : {}}>
            <div>
              <img src={file} srcSet={`${file} 2x`} alt="" onClick={handlePanelClick} style={hover ? styles.coverContain : {}} />
            </div>
          </CardCover>
          <CardContent sx={{ justifyContent: "flex-end" }} onClick={handlePanelClick}>
            <input name="panel" type="file" accept="image/*" id="input-panel-image" hidden onChange={handleChange} />
            <label htmlFor="input-panel-image">
              <Button sx={{ width: "25%" }} onClick={handleButtonClick}>
                Upload
              </Button>
            </label>
          </CardContent>
        </Card>
      </FormControl>
    </div>
  );
}
