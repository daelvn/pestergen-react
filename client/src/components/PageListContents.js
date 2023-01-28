import { ListItem } from "@mui/joy";

export default function PageListContents({ logs }) {
  const logExpanded = logs.map((log, i) => {
    return (
      <ListItem key={i} sx={{ borderRadius: "5px", backgroundColor: "#eee" }}>
        <a href={`/view/${log.id}`}>{log.title}</a>
      </ListItem>
    );
  });
  return logExpanded;
}
