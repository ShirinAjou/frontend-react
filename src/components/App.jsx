import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FetchData from '../DataFetcher.jsx'
import Add from'./Add.jsx'
import Edit from'./Update.jsx'
import '../App.css'

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
      <nav className='nav-container'>
        <Link to="/">Home</Link> |{" "}
        <Link to="/add">Add</Link>
        <Link to="/editor">Editor</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Edit />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App