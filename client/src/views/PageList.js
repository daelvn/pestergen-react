import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import { Divider, List } from "@mui/joy";
import { useState } from "react";

export default function PageList() {
  const [fetched, setFetched] = useState(false);
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState([]);

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
            <b>See all Pesterlogs</b>
          </Typography>
          <Divider />
          <List></List>
        </div>
      </Sheet>
    </CssVarsProvider>
  );
}
