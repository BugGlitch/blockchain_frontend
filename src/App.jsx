import { Routes, Route } from "react-router-dom";
import Authentication from "./components/auth";
import AllBlockChain from "./components/blockChain";

function App() {

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Authentication />} />
        <Route path={"/dashboard"} element={<AllBlockChain />} />
      </Routes>
    </div>
  );
}

export default App;
