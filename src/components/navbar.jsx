const MyNav = ({ onLoginClick }) => {
    return (
      <header className="header">
        <nav className="nav">
          <a href="#" className="nav_logo">
            Cyber Wallet
          </a>
  
          <ul className="nav_items">
            <li className="nav_item">
              <a href="#" className="nav_link">
                Home
              </a>
              <a href="#" className="nav_link">
                Customer Service
              </a>
            </li>
          </ul>
  
          <button className="button" onClick={onLoginClick}>
            Login
          </button>
        </nav>
      </header>
    );
  };
  export default MyNav;
  