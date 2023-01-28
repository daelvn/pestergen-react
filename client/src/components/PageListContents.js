import { ListItem } from "@mui/joy";

import reactCSS from "reactcss";

export default function PageListContents({ logs }) {
  const styles = reactCSS({
    default: {
      item: {
        borderRadius: "sm",
      },
      link: {},
    },
  });
  const logExpanded = logs.map((log, i) => {
    return (
      <ListItem key={i} sx={styles.item}>
        <a href={`/view/${log.id}`}>{log.title}</a>
      </ListItem>
    );
  });
  return logExpanded;
}
