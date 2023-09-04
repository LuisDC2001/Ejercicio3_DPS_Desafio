import logo from './logo.svg';
import { useState } from 'react';
import { Headers } from './components/Headers';
import { PackageList } from './components/PackageList';
import './App.css';

function App() {
  const [total, setTotal] = useState(0);
  return (
    <>
    <Headers
    />
    <PackageList
      total={total}
      setTotal={setTotal}
    />
    </>
   
  );
}

export default App;
