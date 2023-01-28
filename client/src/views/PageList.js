import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import { Divider, List } from "@mui/joy";
import { useEffect, useState } from "react";
import Paginator from "../components/Paginator";
import PageListContents from "../components/PageListContents";

export default function PageList() {
  const [fetched, setFetched] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (fetched) return;
    let req = fetch(`/api/list/${page}`, { method: "GET" });
    req
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          window.alert(`Could not display list! ${json.error}`);
        } else {
          setLogs(json.logs);
          setTotal(json.count);
          setFetched(true);
        }
      });
  });

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
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
          <Typography level="h4">
            <b>See all Pesterlogs</b>
          </Typography>
          <Divider />
          <List>
            <PageListContents logs={logs} />
          </List>
          <Paginator
            total={total}
            page={page}
            setPage={(n) => {
              setPage(n);
              setFetched(false);
            }}
          />
        </div>
      </Sheet>
    </CssVarsProvider>
  );
}
