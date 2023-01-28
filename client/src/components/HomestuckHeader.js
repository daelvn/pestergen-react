export default function HomestuckHeader({ panel, title }) {
  return (
    <div className="row bg-hs-gray bg-light-gray--md pad-t-md--md pos-r">
      <div id="content_container" className="mar-x-auto disp-bl bg-hs-gray" style={{ maxWidth: "650px" }}>
        <h2 className="pad-t-md pad-x-lg--md type-center type-hs-header line-tight">{title}</h2>
        <div className="pad-t-md">
          <img src={panel} srcSet={`${panel} 2x`} alt="" />
        </div>
      </div>
    </div>
  );
}
