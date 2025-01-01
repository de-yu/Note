import './App.css';
import { NavLink, Link } from "react-router";

const linkList = [
  {
    to: "/ActionsUseTransition",
    text: "ActionsUseTransition"
  },
  {
    to: "/ActionsUseActionState",
    text: "ActionsUseActionState"
  },
  {
    to: "/ActionsUseOptimistic",
    text: "ActionsUseOptimistic"
  },
  {
    to: "/UseHook",
    text: "UseHook"
  }
]


function App() {
  return (
    <div className="App">
      {
        linkList.map((link) => {
          return (
            <div key={link.to}>
              <Link to={link.to}>{link.text}</Link>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
