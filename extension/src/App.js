import "./App.css";
import loading from "./assets/loading.svg";
import { useState } from "react";
function App() {
  const [status, setStatus] = useState(1);
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          Czy <span className="hlight">Wuja</span> jest Live?
        </div>
        {status === 0 && (
          <div className="content">
            <img src={loading} alt="loading" className="loading" />
          </div>
        )}
        {status === 1 && (
          <div className="content">
            <div className="content_text">
              Stary nie streamuje, ale zawsze możesz obejrzeć shoty na kanale{" "}
              <a href="https://www.youtube.com/@AwizoTV">AwizoTV</a>
            </div>
          </div>
        )}
        {status === 2 && (
          <div className="content">
            <div className="content_text">NIE</div>
          </div>
        )}
        {status === 2 && (
          <div className="content">
            <div className="content_text">NIE</div>
          </div>
        )}
        <div className="footer">
          <button className="footer_button">Sprawdź!</button>
        </div>
      </div>
    </div>
  );
}

export default App;
