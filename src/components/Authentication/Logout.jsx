const Logout = ({ setAuth }) => {
  const handleLogout = () => {
    setAuth(false);
    sessionStorage.clear();
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
