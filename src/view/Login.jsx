import '../css/login.css';
import { useState } from 'react';

function Login() {
    const [toggleRegistro, setToggleRegistro] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

    function handleToggleRegistro() {
        setToggleRegistro(!toggleRegistro);
        console.log(toggleRegistro)
    }

    function handleLoginChange(e) {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    function handleRegisterChange(e) {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        console.log('Login Data:', loginData);
    }

    function handleRegisterSubmit(e) {
        e.preventDefault();
        console.log('Register Data:', registerData);
    }

    return (
        <div className="container-login">
            <div className={`contenedor-Login-Registro justify-content-center`}>
                <div className='row'>
                    {!toggleRegistro ? <>
                        <div className={`col-12 login login-container align-items-center align-content-center ${!toggleRegistro ? 'visible' : 'hidden'}`}>
                        <h1>Iniciar sesión</h1>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Entrar</button>
                        </form>
                        <p className="mt-3">
                            ¿No tienes cuenta?{' '}
                            <a onClick={handleToggleRegistro} href="#" className="text-decoration-none">
                                Registrarse
                            </a>
                        </p>
                    </div>
                    </> : <>
                    <div className={`login registro-container align-items-center align-content-center ${!toggleRegistro ? 'hidden' : 'visible'}`}>
                        <h1>Registro</h1>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                        </form>
                        <p className="mt-3">
                            ¿Ya tienes cuenta?{' '}
                            <a onClick={handleToggleRegistro} href="#" className="text-decoration-none">
                                Iniciar sesión
                            </a>
                        </p>
                    </div>
                    
                    
                    </>}
                   

                    
                </div>
            </div>
        </div>
    );
}

export default Login;
