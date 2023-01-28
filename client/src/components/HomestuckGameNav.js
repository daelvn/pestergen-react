export default function HomestuckGameNav() {
  return (
    <footer id="story-footer" role="banner">
      <div id="story_footer_container" className="o_story-page-footer flex pad-t-0 pad-x-0 flex-justify">
        <div className="pad-l-lg--md mar-b-md type-hs-small type-hs-bottom--md type-center type-left--md">
          <ul className="o_game-nav">
            <li className="o_game-nav-item">
              <a href="/create">Create New</a>
            </li>
            <li className="o_game-nav-item">
              <a href="/list">View All</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
