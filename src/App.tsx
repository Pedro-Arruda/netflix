import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import './global.scss'

function App() {
  const apikey = import.meta.env.VITE_API_KEY;

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
