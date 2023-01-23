import "./manifest-ui/manifestui.css";
//import "./manifest-ui/manifestui";
import HomestuckFooter from "../components/HomestuckFooter";
import HomestuckHeader from "../components/HomestuckHeader";
import HomestuckNav from "../components/HomestuckNav";
import HomestuckGameNav from "../components/HomestuckGameNav";

export default function Homestuck(title, panel, content, links) {
  return (
    <html>
      <head>
        <script src="https://code.jquery.com/jquery-1.11.3.min.js" />
        <title>Pestergen!</title>
      </head>
      <body>
        <script src="./manifest-ui/homestuck.js" />
        <div class="pos-r">
          <HomestuckHeader panel={panel} title={title} />
          <div class="row bg-hs-gray bg-light-gray--md pad-b-md pad-b-lg--md pos-r">
            <div class="mar-x-auto disp-bl bg-hs-gray pad-t-lg" style="max-width: 650px;">
              {content}
              <HomestuckNav links={links} />
              <HomestuckGameNav />
            </div>
          </div>
        </div>
        <HomestuckFooter />
      </body>
    </html>
  );
}
