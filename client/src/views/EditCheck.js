import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Button } from "@mui/joy";

export default function EditCheck() {
  const [password, setPassword] = useState();
  const { id } = useParams();

  async function checkPassword(id, pass) {
    let checked = fetch("http://localhost:5000/api/auth", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        password: pass,
      }),
    });
    return checked
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          window.alert(json.error);
          resolve(false);
        } else {
          Cookies.set("token", json.authToken);
          resolve(true);
        }
      });
  }

  function handleClick() {
    checkPassword(id, password).then((success) => {
      if (success) window.location.href = `/edit/${id}`;
    });
  }

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Sheet
        sx={{
          width: 400,
          mx: "auto", // margin left & right
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
          <Typography level="h4" sx={{ marginBottom: 2 }}>
            <b>Edit Pesterlog</b>
          </Typography>
          <Input type="password" name="password" placeholder="Password to edit..." value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button sx={{ my: 2, width: "100%" }} onClick={handleClick}>
            Login
          </Button>
        </div>
      </Sheet>
    </CssVarsProvider>
  );
}
