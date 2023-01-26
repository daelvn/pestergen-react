import Textarea from "@mui/joy/Textarea";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import LogInput from "./LogInput";

export default function Log() {
  return (
    <div>
      <FormLabel>Log</FormLabel>
      <Textarea placeholder="Lines will show here" variant="soft" disabled={true} />
      <Divider sx={{ margin: 2 }} />
      <LogInput />
    </div>
  );
}
