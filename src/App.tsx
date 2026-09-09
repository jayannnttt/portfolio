import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
