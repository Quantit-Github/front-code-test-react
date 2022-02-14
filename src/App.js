
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import routes from "./config/route";

import './style/App.css';

function App() {
  console.log(`ENV: ${process.env.REACT_APP_ENV}`)

  const history = createBrowserHistory();

  return (
    <BrowserRouter history={history}>
      <Routes>
        {routes.map((r) => (
          <Route key={r.name} path={r.path} element={r.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
