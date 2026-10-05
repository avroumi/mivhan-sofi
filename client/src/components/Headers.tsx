import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <header className="header">
      <h1>Logo</h1>
      <div className="navbar">
        <Link to={"/"}>Home</Link>
        <Link to="/informations">Informations</Link>
      </div>
    </header>
  );
};

export default Headers;
