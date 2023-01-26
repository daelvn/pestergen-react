import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import LogColorPicker from "../components/LogColorPicker";

function LogInputButton() {
  return <Button>Insert</Button>;
}

export default function LogInput() {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
      <Grid xs={2}>
        <LogColorPicker />
      </Grid>
      <Grid xs={7}>
        <Input name="intervention" id="log-input-intervention" placeholder="Character/Handle" />
      </Grid>
      <Grid xs={3}>
        <Select placeholder="Type..." defaultValue="character">
          <Option value="character">Character</Option>
          <Option value="narrator">Narrator</Option>
        </Select>
      </Grid>
      <Grid xs={12}>
        <Input name="line" id="log-input-line" placeholder="Insert next line here" endDecorator={<LogInputButton />} />
      </Grid>
    </Grid>
  );
}
