import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "components/pageHeader/header";
import SearchPage from "pages/pageRepoList/reposearchPage";
import { useState } from "react";

function App() {
  const [curentPage, displayPage] = useState("search");
  return (
    <BrowserRouter>
      <Header classname={"header"}></Header>
      <Routes>
        {/* <Header classname="headerMain"></Header> */}
        {curentPage === "search" && (
          <Route path="/" element={<SearchPage></SearchPage>} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
