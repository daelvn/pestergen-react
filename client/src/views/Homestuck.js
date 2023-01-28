//import "./manifest-ui/manifestui.css";
//import "./manifest-ui/manifestui";
import HomestuckFooter from "../components/HomestuckFooter";
import HomestuckHeader from "../components/HomestuckHeader";
import HomestuckNav from "../components/HomestuckNav";
import HomestuckGameNav from "../components/HomestuckGameNav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Homestuck({ overrideId }) {
  const [panel, setPanel] = useState("");
  const [title, setTitle] = useState("");
  const [log, setLog] = useState([]);
  const [links, setLinks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let localId = id || overrideId;
    console.log("fetching!", localId);
    let req = fetch(`http://localhost:5000/api/view/${localId}`, { method: "GET", mode: "no-cors" });
    req
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          window.location.href = "/404";
        }
        setTitle(json.title);
        setPanel(json.panel.uri);
        setLog(JSON.decode(json.log));
        setLinks(JSON.decode(json.links));
      });
  });

  return (
    <div id="homestuck">
      <link rel="stylesheet" type="text/css" href="./manifest-ui/manifestui.css" />
      <script src="./manifest-ui/homestuck.js" />
      <div className="pos-r">
        <HomestuckHeader panel={panel} title={title} />
        <div className="row bg-hs-gray bg-light-gray--md pad-b-md pad-b-lg--md pos-r">
          <div className="mar-x-auto disp-bl bg-hs-gray pad-t-lg" style={{ maxWidth: "650px" }}>
            {log}
            <HomestuckNav links={links} />
            <HomestuckGameNav />
          </div>
        </div>
      </div>
      <HomestuckFooter />
    </div>
  );
}
