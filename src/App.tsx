import React, { useCallback } from "react";
import "./App.css";

type Props = { converterApi: string };

const App = ({ converterApi }: Props) => {

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    console.log(`pasted ${text.length} characters`);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <textarea onPaste={handlePaste} />
      </header>
    </div>
  );
};
export default App;
