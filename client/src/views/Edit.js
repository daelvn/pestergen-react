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

import Cookies from "js-cookie";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import reactCSS from "reactcss";

import Panel from "../components/Panel";
import Log from "../components/Log";
import Links from "../components/Links";

export default function Edit({ password }) {
  const [formData, setFormData] = useState({ invalid: true });
  const [oldLog, setOldLog] = useState({});
  const [fetched, setFetched] = useState(false);
  const { id } = useParams();

  // controlled components
  const [title, setTitle] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [lines, setLines] = useState([]);
  const [links, setLinks] = useState([]);
  const [file, setFile] = useState("/static/img/panel.png");

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
    //console.log(formData);
    // check that all mandatory attributes exist and add defaults
    const CHECK_ATTRIBUTES = ["title", "id", "panel", "links", "lines", "password"];
    for (let attribute of CHECK_ATTRIBUTES) {
      console.log("attr", attribute, typeof formData[attribute]);
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
        default:
          break;
      }
    }
    // create form data object

    let formDataObject = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "lines" || key === "links") {
        formDataObject.append(key, JSON.stringify(formData[key]));
      } else if (key !== "panel") {
        formDataObject.append(key, formData[key]);
      }
    });
    formDataObject.append("panel", formData.panel, `${encodeURI(formData.id)}+${encodeURI(formData.title)}`);
    // request the API
    let request = fetch("/api/edit", {
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
          window.location.href = `/view/${json.id}`;
        }
      });
  }

  // fetch original data to edit
  useEffect(() => {
    if (fetched) return;
    let req = fetch(`/api/view/${id}`, { method: "GET" });
    req
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          window.location.href = "/404";
        }
        console.log("fetched!", json);
        setOldLog(json);
        setTitle(json.title);
        setInputId(json.id);
        setInputPassword(Cookies.get("token"));
        // change lines
        let fetchedLines = JSON.parse(json.log || "[]");
        setLines(fetchedLines);
        // change links
        let fetchedLinks = json.links.map((link) => link.id);
        console.log("fetchedLinks", fetchedLinks);
        setLinks(fetchedLinks);
        // change panel
        let fetchedImage = fetch(`https://pestergen.nyc3.cdn.digitaloceanspaces.com/${json.panel.uri}`);
        fetchedImage
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], json.panel.uri); //, { type: blob.type }
            console.log("reading as blob!", file);
            setFile(URL.createObjectURL(file));
            setFormData({ id: json.id, title: json.title, password: Cookies.get("token"), lines: fetchedLines, links: fetchedLinks, panel: file });
          });

        // done
        setFetched(true);
      });
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
            <b>Edit a Pesterlog</b>
          </Typography>
          <form encType="mutlipart/form-data">
            <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
              <Grid xs={6}>
                <Panel oldLog={oldLog} formData={formData} setFormData={setFormData} file={file} setFile={setFile} />
              </Grid>
              <Grid xs={6}>
                <Log oldLog={oldLog} formData={formData} setFormData={setFormData} lines={lines} setLines={setLines} />
              </Grid>
              <Grid xs={6}>
                <div style={styles.inputs}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      type="text"
                      placeholder="Title of your page"
                      value={title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        setTitle(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>ID</FormLabel>
                    <Input
                      name="id"
                      disabled={true}
                      value={inputId}
                      type="text"
                      placeholder="This will be the URL of the page. Leave blank for a random one."
                      onChange={(e) => {
                        setFormData({ ...formData, id: e.target.value });
                        setInputId(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" value={inputPassword} disabled={true} placeholder="Set a password if you want to edit this later." />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Links</FormLabel>
                    <Links oldLog={oldLog} formData={formData} setFormData={setFormData} links={links} setLinks={setLinks} />
                  </FormControl>
                  <FormControl>
                    <Button sx={{ my: 2 }} onClick={submitForm}>
                      Edit
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
