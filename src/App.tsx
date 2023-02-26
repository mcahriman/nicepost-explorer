import PasteInput from "components/PasteInput";
import "./App.css";
import { expandExample, expandExampleInstagram } from "examples/expandExample";
import PasteResult from "components/PasteResult";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoll,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import CodeMirrorExample from "components/CodeMirrorExample";

type Props = { converterApi: string };

const App = ({ converterApi }: Props) => {
  const [pastedJson, setPastedJson] = useState<string | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faPoll} />
          Poor Man's S***post Explorer&trade;
        </h1>
      </header>

      <main>
        <nav>
          <h3>1. Copy code below and run it in console on m.facebook.com</h3>
          <h3>
            <FontAwesomeIcon icon={faWarning} />
            Works in Firefox only
          </h3>

          <CodeMirrorExample
            title="instagram web"
            code={expandExampleInstagram}
          />
          <CodeMirrorExample title="m.facebook.com" code={expandExample} />

          <h3>2. Paste the result into the text area below</h3>
          <PasteInput onPasteJson={setPastedJson} />
        </nav>
        <div className="mainContent">
          <PasteResult data={pastedJson} />
        </div>
      </main>
    </div>
  );
};
export default App;
