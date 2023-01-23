import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import First from "./Routes/First";
import Second from "./Routes/Second";
import Third from "./Routes/Third";

const App = (): ReactElement => {
  return (
    <Router>
      <header> it-s header</header>
      <nav>
        <header>links</header>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/second">2</Link>
          </li>
          <li>
            <Link to="/third">3</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/second" element={<Second />} />
          <Route path="/third" element={<Third />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
