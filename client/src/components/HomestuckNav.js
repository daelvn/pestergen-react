export default function HomestuckNav({ links }) {
  const linkList = links.map((link, i) => {
    return (
      <div>
        <a href={`/${link.id}`}>{link.title}</a>
      </div>
    );
  });

  return (
    <div className="o_story-nav type-hs-copy line-tight pad-x-0 pad-x-lg--md mar-b-lg">
      <div>{linkList}</div>
    </div>
  );
}
