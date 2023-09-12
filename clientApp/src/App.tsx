import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "components/pageHeader/header";
import SearchPage from "pages/pageRepoList/reposearchPage";
import RepoPage from "pages/repoPage";

function App() {
  return (
    <BrowserRouter>
      <Header classname={"header"}></Header>
      <Routes>
        <Route path="/" element={<SearchPage/>} />
        <Route path="/repo/:owner/:name" element={<RepoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
