export default function HomestuckFooter() {
  return (
    <div className="o_site-footer row pos-r pad-t-rg pad-b-xl pad-b-0--md bg-dark-gray" style={{ textAlign: "center" }}>
      <div className="type-center pad-t-md--md">
        <div className="float-l">
          <img src="https://homestuck.com/assets/footer_logo-a913b68f0efbaed8da48bc0a4f22b35d369f40d0e4db132013acbe6f26b3e37f.gif" alt="" />
        </div>
        <div className="float-r disp-n disp-bl--sm">
          <img src="https://homestuck.com/assets/footer_logo-a913b68f0efbaed8da48bc0a4f22b35d369f40d0e4db132013acbe6f26b3e37f.gif" alt="" />
        </div>
        <ul>
          <li>
            <a href="/">Homepage</a>
          </li>
          <li>
            <a href="https://github.com/daelvn/pestergen-react">Source</a>
          </li>
        </ul>
        <div style={{ textAlign: "center" }}>
          <span>Made by @satvrn. Hosted on Heroku.</span>
        </div>
      </div>
    </div>
  );
}
