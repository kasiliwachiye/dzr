import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ArtistDetails from "./pages/ArtistDetails";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/artist/:artistId" element={<ArtistDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
