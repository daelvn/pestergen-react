export default function HomestuckHeader(panel, title) {
  return (
    <div class="row bg-hs-gray bg-light-gray--md pad-t-md--md pos-r">
      <div id="content_container" class="mar-x-auto disp-bl bg-hs-gray" style="max-width: 650px;">
        <h2 class="pad-t-md pad-x-lg--md type-center type-hs-header line-tight">{title}</h2>
        <div class="pad-t-md">{panel}</div>
      </div>
    </div>
  );
}
