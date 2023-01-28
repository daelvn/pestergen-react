import { Button } from "@mui/joy";
import { Stack } from "@mui/system";

export default function Paginator({ total, page, setPage }) {
  let buttons = [...Array(total).keys()].map((i) => {
    return <Button onClick={() => setPage(i + 1)}>{i + 1}</Button>;
  });
  return (
    <Stack direction="row" spacing={2}>
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
