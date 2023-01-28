import { Input, ListItem, ListItemContent, Button, List } from "@mui/joy";
import { useState } from "react";

export default function Links({ formData, setFormData }) {
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState([]);

  function handleAdd() {
    setLinks(links.concat([link]));
    setFormData({ ...formData, links: links.concat([link]) });
    setLink("");
    document.getElementById("input-link").value = "";
  }

  function handleChange(ev) {
    setLink(ev.target.value);
  }

  function handleRemoveElement(n) {
    return function () {
      let linksCopy = [...links];
      linksCopy.splice(n, 1);
      setLinks(linksCopy);
      setFormData({ ...formData, links: linksCopy });
    };
  }

  const linkElements = links.map((linkElement, index) => {
    return (
      <ListItem
        key={index}
        endAction={
          <Button aria-label="Delete" size="sm" color="danger" onClick={handleRemoveElement(index)}>
            x
          </Button>
        }
      >
        <ListItemContent>{linkElement}</ListItemContent>
      </ListItem>
    );
  });

  return (
    <div>
      <Input
        slotProps={{ input: { id: "input-link" } }}
        type="text"
        placeholder="ID of a page you want to link to"
        endDecorator={<Button onClick={handleAdd}>+</Button>}
        onChange={handleChange}
      />
      <List>{linkElements}</List>
    </div>
  );
}
