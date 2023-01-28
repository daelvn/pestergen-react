//import "./manifest-ui/manifestui.css";
//import "./manifest-ui/manifestui";
import HomestuckFooter from "../components/HomestuckFooter";
import HomestuckHeader from "../components/HomestuckHeader";
import HomestuckNav from "../components/HomestuckNav";
import HomestuckGameNav from "../components/HomestuckGameNav";
import HomestuckLog from "../components/HomestuckLog";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Homestuck({ overrideId }) {
  const [panel, setPanel] = useState("");
  const [title, setTitle] = useState("");
  const [log, setLog] = useState([]);
  const [links, setLinks] = useState([]);
  const [fetched, setFetched] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (fetched) {
      //console.log(log);
      return;
    }
    let localId = id || overrideId;
    //console.log("fetching!", localId);
    let req = fetch(`http://localhost:5000/api/view/${localId}`, { method: "GET" });
    req
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          window.location.href = "/404";
        }
        setTitle(json.title);
        setPanel(json.panel.uri);
        setLog(JSON.parse(json.log));
        setLinks(json.links);
        setFetched(true);
      });
  });

  return (
    <div id="homestuck">
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/static/manifest-ui/manifestui.css" />
        <script src="/static/manifest-ui/homestuck.js" />
      </Helmet>
      <div className="pos-r">
        <HomestuckHeader panel={panel} title={title} />
        <div className="row bg-hs-gray bg-light-gray--md pad-b-md pad-b-lg--md pos-r">
          <div className="mar-x-auto disp-bl bg-hs-gray pad-t-lg" style={{ maxWidth: "650px" }}>
            <HomestuckLog lines={log} />
            <HomestuckNav links={links} />
            <HomestuckGameNav />
          </div>
        </div>
      </div>
      <HomestuckFooter />
    </div>
  );
}
