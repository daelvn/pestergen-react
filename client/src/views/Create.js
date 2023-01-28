// TODO: create multipart form for uploading
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";

import { useState } from "react";
import reactCSS from "reactcss";

import Panel from "../components/Panel";
import Log from "../components/Log";
import Links from "../components/Links";

export default function Create() {
  const [formData, setFormData] = useState({ invalid: true });

  const styles = reactCSS({
    default: {
      inputs: {
        width: "75%",
        margin: "auto",
      },
    },
  });

  function submitForm() {
    setFormData({ ...formData, invalid: false });
    console.log(formData);
    // check that all mandatory attributes exist and add defaults
    const CHECK_ATTRIBUTES = ["title", "id", "panel", "links", "lines", "password"];
    for (attribute of CHECK_ATTRIBUTES) {
      switch (attribute) {
        case "title":
        case "panel":
          if (!formData[attribute]) {
            window.alert("You can't upload a panel without a title or image!");
            return;
          }
          break;
        case "links":
          if (!formData.links) {
            setFormData({ ...formData, links: [] });
          }
          break;
        case "lines":
          if (!formData.lines) {
            setFormData({ ...formData, lines: [] });
          }
          break;
      }
    }
    // create form data object
    let formDataObject = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "panel") {
        formDataObject.append(key, formData[key]);
      } else if (key === "lines" || key === "links") {
        formDataObject.append(key, JSON.stringify(formData[key]));
      }
    });
    formDataObject.append("panel", formData.panel, `${encodeURI(formData.id)}+${encodeURI(formData.title)}`);
    // request the API
    let request = fetch("/api/create", {
      method: "post",
      body: formDataObject,
    });
    // process the response
    request
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          window.alert(`Upload error! ${json.error}`);
        } else {
          // TODO redirect to page
        }
      });
  }

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
          <form encType="mutlipart/form-data">
            <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
              <Grid xs={6}>
                <Panel formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid xs={6}>
                <Log formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid xs={6}>
                <div style={styles.inputs}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input name="title" type="text" placeholder="Title of your page" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>ID</FormLabel>
                    <Input
                      name="id"
                      type="text"
                      placeholder="This will be the URL of the page. Leave blank for a random one."
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Set a password if you want to edit this later."
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Links</FormLabel>
                    <Links formData={formData} setFormData={setFormData} />
                  </FormControl>
                  <FormControl>
                    <Button sx={{ my: 2 }} onClick={submitForm}>
                      Create
                    </Button>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Sheet>
    </CssVarsProvider>
  );
}
