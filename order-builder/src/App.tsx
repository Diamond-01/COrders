// src/App.tsx

import { useState } from 'react';
import BuilderPage from './pages/BuilderPage';
import TemplatesPage from './pages/TemplatesPage';
import Header from './components/Header';

function App() {
  const [page, setPage] = useState<'builder' | 'templates'>('builder');
  const [editingTemplate, setEditingTemplate] = useState<any | null>(null);

  return (
    <>
      <Header onNavigate={setPage} />

      {page === 'builder' && (
        <BuilderPage
          initialTemplate={editingTemplate}
          clearEditing={() => setEditingTemplate(null)}
        />
      )}

      {page === 'templates' && (
        <TemplatesPage
          onEditTemplate={(template) => {
            setEditingTemplate(template);
            setPage('builder');
          }}
        />
      )}
    </>
  );
}

export default App;
