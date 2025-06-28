import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-isrm-dark text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">ISRM</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-isrm-accent">Home</Link>
        <Link to="/docs" className="hover:text-isrm-accent">Docs</Link>
        <Link to="/simulations" className="hover:text-isrm-accent">Simulations</Link>
      </div>
    </nav>
  );
};

export default Navbar;
