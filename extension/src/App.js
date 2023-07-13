import "./App.css";
import loading from "./assets/loading.svg";
import { useState, useEffect } from "react";
import { parse } from "node-html-parser";
import fetch from "node-fetch";
import axios from "axios";

function App() {
  const [status, setStatus] = useState();
  const [title, setTitle] = useState("");
  const [checkLaunch, setCheckLaunch] = useState(1);

  useEffect(() => {
    setStatus(0);
    axios
      .get("https://fantastic-erin-lizard.cyclic.app/")
      .then(({ data }) => {
        if (data == null) {
          return;
        }
        setStatus(data.status);
        setTitle(data.text);
      })
      .catch((err) => {
        setStatus(4);
      });
  }, [checkLaunch]);

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
            <div className="content_text">
              Stary siedzi na <span className="hlight">YouTube</span> <br />
              <a href="https://www.youtube.com/@dominikbos/live">
                Kliknij tutaj
              </a>
            </div>
          </div>
        )}
        {status === 3 && (
          <div className="content">
            <div className="content_text">
              Stary siedzi na <span className="hlight">Twitch</span> <br />
              <a href="https://www.twitch.tv/awizotv">Kliknij tutaj</a>
            </div>
          </div>
        )}
        {status === 3 && (
          <div className="content">
            <div className="content_text">
              Wystąpił błąd! <br />
              Nigdy nie dowiemy się prawdy!
            </div>
          </div>
        )}
        <div className="footer">
          <button
            onClick={() => {
              setCheckLaunch((checkLaunch) => checkLaunch + 1);
            }}
            className="footer_button"
          >
            Sprawdź jeszcze raz!
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
