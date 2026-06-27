import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import ComingSoon from './pages/ComingSoon';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone full-screen login — no sidebar/navbar */}
        <Route path="/login" element={<Login />} />

        {/* All other pages share the Layout (sidebar + navbar + footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="clients" element={<ComingSoon />} />
          <Route path="profile" element={<Profile />} />
          {/* Catch-all → dashboard */}
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
