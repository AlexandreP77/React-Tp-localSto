// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tâches, setTâches] = useState([]);
  const [filtre, setFiltre] = useState('toutes');
  const [saisieTâche, setSaisieTâche] = useState('');

  useEffect(() => {
    const tâchesStockées = JSON.parse(localStorage.getItem('tâches')) || [];
    setTâches(tâchesStockées);
  }, []);

  useEffect(() => {
    localStorage.setItem('tâches', JSON.stringify(tâches));
  }, [tâches]);

  const ajouterTâche = () => {
    if (!saisieTâche.trim()) return;
    const nouvelleTâche = { id: Date.now(), texte: saisieTâche, terminée: false };
    setTâches([...tâches, nouvelleTâche]);
    setSaisieTâche('');
  };

  const basculerTerminée = (id) => {
    setTâches(tâches.map(tâche => 
      tâche.id === id ? { ...tâche, terminée: !tâche.terminée } : tâche
    ));
  };

  const tâchesFiltrées = tâches.filter(tâche => {
    if (filtre === 'complétées') return tâche.terminée;
    if (filtre === 'actives') return !tâche.terminée;
    return true;
  });

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={saisieTâche}
          onChange={(e) => setSaisieTâche(e.target.value)}
          placeholder="Ajouter une tâche"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={ajouterTâche} className="btn btn-primary ml-2">Ajouter</button>
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setFiltre('toutes')} className={`btn ${filtre === 'toutes' ? 'btn-active' : ''}`}>Toutes</button>
        <button onClick={() => setFiltre('actives')} className={`btn ${filtre === 'actives' ? 'btn-active' : ''}`}>Actives</button>
        <button onClick={() => setFiltre('complétées')} className={`btn ${filtre === 'complétées' ? 'btn-active' : ''}`}>Complétées</button>
      </div>
      <ul className="space-y-2">
        {tâchesFiltrées.map(tâche => (
          <li key={tâche.id} onClick={() => basculerTerminée(tâche.id)} className={`cursor-pointer ${tâche.terminée ? 'line-through' : ''}`}>
            {tâche.texte}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
