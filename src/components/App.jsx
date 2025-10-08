import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FetchData from '../DataFetcher.jsx'
import '../App.css'
import Add from'./Add.jsx'
import Edit from'./Update.jsx'
import Delete from'./Delete.jsx'

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
        <Link to="/add">Add</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App