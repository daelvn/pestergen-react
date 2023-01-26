//import "./manifest-ui/manifestui.css";
//import "./manifest-ui/manifestui";
import HomestuckFooter from "../components/HomestuckFooter";
import HomestuckHeader from "../components/HomestuckHeader";
import HomestuckNav from "../components/HomestuckNav";
import HomestuckGameNav from "../components/HomestuckGameNav";

// FIXME this should only ask for an ID
export default function Homestuck(title, panel, content, links) {
  return (
    <div id="homestuck">
      <link rel="stylesheet" type="text/css" href="./manifest-ui/manifestui.css" />
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
    </div>
  );
}
