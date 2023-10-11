import HomePage from "./components/page";
import { Routes, Route } from "react-router-dom";
import UserAuth from "./components/page/auth";
import "./App.css";

function App() {
  return (
    <div className="over_all">
      <div className="design">
        <div className="design2">
          <Routes>
            <Route path="/" element={<UserAuth />} />
            <Route path="dashboard" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
