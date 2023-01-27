import FormLabel from "@mui/joy/FormLabel";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";

import reactCSS from "reactcss";

export default function Panel() {
  const styles = reactCSS({
    default: {
      panel: {
        width: "75%",
        margin: "auto",
      },
    },
  });

  return (
    <div style={styles.panel}>
      <FormControl>
        <FormLabel>Panel</FormLabel>
        <Card sx={{ aspectRatio: "13 / 9" }}>
          <CardCover>
            <img src="/static/img/panel.png" srcSet="/static/img/panel.png 2x" alt="" />
          </CardCover>
          <CardContent sx={{ justifyContent: "flex-end" }}>
            <Button sx={{ width: "25%" }}>Upload</Button>
          </CardContent>
        </Card>
      </FormControl>
    </div>
  );
}
