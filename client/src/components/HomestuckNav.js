export default function HomestuckNav({ links }) {
  var linkList = <span></span>;
  if (links.constructor === Array && links.length > 0) {
    links = links.map((link) => <a href={`/${link.id}`}>{link.text}</a>);
  }

  return (
    <div className="o_story-nav type-hs-copy line-tight pad-x-0 pad-x-lg--md mar-b-lg">
      <div>{linkList}</div>
    </div>
  );
}
