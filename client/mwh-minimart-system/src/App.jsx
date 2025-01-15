import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import UserManagement from "./pages/UserManagement";
import RequestManagement from "./pages/RequestManagement";
import RequestHistory from "./pages/RequestHistory";
import InventoryManagement from "./pages/InventoryManagement";
import TaskManagement from "./pages/TaskManagement";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useState, useRef } from "react";

function App() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 1000); // 3 seconds delay
  };
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user-management">User Management</Link>
            </li>
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer">Request Management</span>
              {isDropdownOpen && (
                <ul className="absolute mt-2 bg-white border rounded shadow-lg">
                  <li>
                    <Link to="/request-management" className="block px-4 py-2 hover:bg-gray-200">
                      Current
                    </Link>
                  </li>
                  <li>
                    <Link to="/request-history" className="block px-4 py-2 hover:bg-gray-200">
                      History
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/inventory-management">Inventory Management</Link>
            </li>
            <li>
              <Link to="/task-management">Task Management</Link>
            </li>
            <li>
              <Link to="/achievements">Achievements</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                  </a>
                  <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img
                      src={reactLogo}
                      className="logo react"
                      alt="React logo"
                    />
                  </a>
                </div>
                <h1>Vite + React</h1>
                <p>Your original content here.</p>
              </>
            }
          />
          <Route
            path="/user-management"
            element={
              <>
                <UserManagement />
                <ToastContainer />
              </>
            }
          />
          <Route
            path="/request-management"
            element={
              <>
                <RequestManagement />
                <ToastContainer />
              </>
            }
          />
          <Route
            path="/request-history"
            element={
              <>
                <RequestHistory />
                <ToastContainer />
              </>
            }
            />
          <Route
            path="/inventory-management"
            element={
              <>
                <InventoryManagement />
                <ToastContainer />
              </>
            }
          />
          <Route
            path="/task-management"
            element={
              <>
                <TaskManagement />
                <ToastContainer />
              </>
            }
          />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;