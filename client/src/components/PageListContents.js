import { ListItem, ListItemButton, Button } from "@mui/joy";

import reactCSS from "reactcss";

export default function PageListContents({ logs }) {
  const styles = reactCSS({
    default: {
      item: {
        "--List-item-radius": "5px",
        "--List-item-minHeight": "40",
        "--List-padding": "15",
      },
      link: {},
    },
  });
  const logExpanded = logs.map((log, i) => {
    return (
      <ListItem
        key={i}
        sx={styles.item}
        endAction={
          <Button size="sm" variant="soft" onClick={() => (window.location.href = `/view/${log.id}`)}>
            &gt;
          </Button>
        }
      >
        <ListItemButton onClick={() => (window.location.href = `/view/${log.id}`)}>{log.title}</ListItemButton>
      </ListItem>
    );
  });
  return logExpanded;
}
