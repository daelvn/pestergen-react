import { Helmet } from "react-helmet-async";
import "../index.css";

export default function NotFound() {
  return (
    <div align="center" className="comic">
      <img src="/static/howhigh.jpg" alt="" />
      <h1>uh oh...</h1>
      <p>we cannot found the page. so sorry! ha ha</p>
      <a href="/">go back HOEM</a>
      <Helmet>
        <meta name="description" content="paeg not FOUND" />
        <meta content="Pestergen!" property="og:title" />
        <meta content="This page doesnt exist. Are you sure you got the right link?" property="og:description" />
        <meta content="https://pestergen.daelvn.com" property="og:url" />
        <meta content="https://pestergen.daelvn.com/static/embed.png" property="og:image" />
        <meta content="#43B581" data-react-helmet="true" name="theme-color" />

        <title>Pestergen!</title>
      </Helmet>
    </div>
  );
}
