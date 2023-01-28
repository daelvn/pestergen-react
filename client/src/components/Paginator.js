import { Button } from "@mui/joy";
import { Stack } from "@mui/system";
import reactCSS from "reactcss";

export default function Paginator({ total, page, setPage }) {
  const styles = reactCSS({
    default: {
      button: {},
      stack: {
        justifyContent: "space-between",
      },
    },
  });
  let buttons = [page - 1, page, page + 1].map((i) => {
    if (i < 1) return null;
    if (i > total) return null;
    return (
      <Button key={i} variant="outlined" onClick={() => setPage(i)}>
        {i}
      </Button>
    );
  });
  return (
    <Stack direction="row" spacing={2} sx={styles.stack}>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        &lt;
      </Button>
      {buttons}
      <Button disabled={page >= total} onClick={() => setPage(page - 1)}>
        &gt;
      </Button>
    </Stack>
  );
}
