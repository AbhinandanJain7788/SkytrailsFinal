// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App




import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import CountriesList from './Components/CountryList';
import BlogList from './Components/BlogList';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
const App = () => {
  const [user, setUser] = useState(localStorage.getItem("userId") || null);
 
  return (
    <Router>
      <Navbar  user={user} setUser={setUser} />
     
      <Routes>
        <Route path="/" element={<Home user={user} />} />
       
        <Route path="/country" element={<CountriesList />} />
        <Route path="/blog" element={<BlogList />} />

        {user && (
          <>

            <Route path="/countries" element={<CountriesList />} />
            <Route path="/blogs" element={<BlogList />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
