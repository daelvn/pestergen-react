export default function CreateHomepageButton() {
  function handleClick() {
    console.log("Calling initialSetup!");
    //initialSetup();
  }
  return <button onClick={handleClick}>Create Homepage</button>;
}
