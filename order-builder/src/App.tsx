// src/App.tsx

import { useState } from 'react';
import BuilderPage from './pages/BuilderPage';
import TemplatesPage from './pages/TemplatesPage';
import Header from './components/Header';

function App() {
  const [page, setPage] = useState<'builder' | 'templates'>('builder');

  return (
    <>
      <Header onNavigate={setPage} />

      {page === 'builder' && <BuilderPage />}
      {page === 'templates' && <TemplatesPage />}
    </>
  );
}

export default App;
