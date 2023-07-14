import "./App.css";
import loading from "./assets/loading.svg";
import { useState, useEffect } from "react";
import { parse } from "node-html-parser";
import fetch from "node-fetch";
import axios from "axios";

function App() {
  const [status, setStatus] = useState();
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
      })
      .catch((err) => {
        console.log(err);
        setStatus(4);
      });
  }, [checkLaunch]);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          Czy <span className="hlight">Wuja</span> jest Live?
        </div>
        <div className="content">
          <div className="content_text">
            {status === 0 && (
              <div className="content">
                <img src={loading} alt="loading" className="loading" />
              </div>
            )}
            {status === 1 && (
              <>
                Stary nie streamuje, ale zawsze możesz obejrzeć shoty na kanale{" "}
                <span className="hlight">AwizoTV</span>
              </>
            )}
            {status === 2 && (
              <>
                Stary siedzi na <span className="hlight">YouTube</span> <br />
              </>
            )}
            {status === 3 && (
              <>
                Stary siedzi na <span className="hlight">Twitch</span> <br />
              </>
            )}
            {status === 4 && (
              <>
                {" "}
                Wystąpił błąd! <br />
                Nigdy nie dowiemy się prawdy!
              </>
            )}
          </div>
        </div>
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
