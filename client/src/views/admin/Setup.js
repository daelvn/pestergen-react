import Logo from "../../components/Logo.js";
import CreateHomepageButton from "../../components/admin/CreateHomepageButton.js";
import "./Setup.css";

function Setup() {
  return (
    <div className="Setup">
      <header className="Setup-header">
        <Logo />
        <p>Click to create homepage.</p>
        <CreateHomepageButton />
      </header>
    </div>
  );
}

export default Setup;
