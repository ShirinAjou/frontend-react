import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FetchData from '../DataFetcher.jsx'
import '../App.css'
import Add from'./Add.jsx'
import Edit from'./Update.jsx'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <FetchData />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/frontend-react">
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/add">Add</Link> |{" "}
        <Link to="/edit/1">Edit</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App