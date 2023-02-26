import PasteInput from "components/PasteInput";
import "./App.css";
import expandExample from "examples/expandExample";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import PasteResult from "components/PasteResult";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faClipboard, faPoll } from "@fortawesome/free-solid-svg-icons";


type Props = { converterApi: string };

const App = ({ converterApi }: Props) => {
  const [copied, setCopied] = useState(false);
  const [pastedJson, setPastedJson] = useState<string | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(expandExample).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1><FontAwesomeIcon icon={faPoll}/>Poor Man S***post Explorer&trade;</h1>
      </header>

      <main>
        <nav>
          <h3>1. Copy code below and run it in console on m.facebook.com</h3>
          <button
            className="copyButton"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            {copied ?  <FontAwesomeIcon icon={faClipboardCheck}  /> : <FontAwesomeIcon icon={faClipboard}  />}
          </button>

          <ReactCodeMirror
            className="codeContainer"
            value={expandExample}
            extensions={[javascript({})]}
            height="30rem"
            width="100%"
          />
          <h3>2. Paste the result into the text area below</h3>
          <PasteInput onPasteJson={setPastedJson}/>
        </nav>
        <div className="mainContent">
          <PasteResult data={pastedJson}/>
        </div>
      </main>
    </div>
  );
};
export default App;
