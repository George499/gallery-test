import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Layout>
  );
}

export default App;
