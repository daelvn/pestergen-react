// TODO: create multipart form for uploading
// TODO: find react UIs
import { CssVarsProvider } from "@mui/joy/styles";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Grid from "@mui/joy/Grid";
import { Form } from "react-router-dom";

import reactCSS from "reactcss";

import Panel from "../components/Panel";
import Log from "../components/Log";

export default function Create() {
  const styles = reactCSS({
    default: {
      inputs: {
        width: "75%",
        margin: "auto",
      },
    },
  });

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Sheet
        sx={{
          //width: 300,
          mx: 4, // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "block",
          //flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4">
            <b>Create a Pesterlog</b>
          </Typography>
          <FormControl>
            <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
              <Grid xs={6}>
                <Panel />
              </Grid>
              <Grid xs={6}>
                <Log />
              </Grid>
              <Grid xs={6}>
                <div style={styles.inputs}>
                  <FormLabel>Title</FormLabel>
                  <Input name="title" type="text" placeholder="Title of your page" />
                  <FormLabel>ID</FormLabel>
                  <Input name="id" type="text" placeholder="This will be the URL of the page. Leave blank for a random one." />
                  <FormLabel>Password</FormLabel>
                  <Input name="password" type="password" placeholder="Set a password if you want to edit this later." />
                </div>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </Sheet>
    </CssVarsProvider>
  );
}
