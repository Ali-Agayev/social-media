import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import WhyMe from './pages/WhyMe';
import Audience from './pages/Audience';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  const [lang, setLang] = useState('az');

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Layout lang={lang} setLang={setLang} />}>
        <Route index element={<Home lang={lang} />} />
        <Route path="services" element={<Services lang={lang} />} />
        <Route path="why-me" element={<WhyMe lang={lang} />} />
        <Route path="audience" element={<Audience lang={lang} />} />
        <Route path="contact" element={<Contact lang={lang} />} />
      </Route>
    </Routes>
  );
}

export default App;
