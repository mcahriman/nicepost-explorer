import PasteInput from "components/PasteInput";
import "./App.css";

type Props = { converterApi: string };

const App = ({ converterApi }: Props) => {
  return (
    <div className="App">
      <header className="App-header">
        <PasteInput />
      </header>
    </div>
  );
};
export default App;
