import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/Home';
import Login from './view/Login';


function App() {
    return (
        <Router>
            <div>
                {/* Encabezado o barra de navegación opcional */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;