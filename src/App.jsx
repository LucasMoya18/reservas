import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/Home';
import Login from './view/Login';
import CuadroNotificaciones from './view/componentes/CuadroNotificaciones';

function App() {
    return (
        <Router>
            <div>
                {/* Encabezado o barra de navegación opcional */}
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/nots" element={<CuadroNotificaciones/>}/>

                </Routes>
            </div>
        </Router>
    );
}

export default App;