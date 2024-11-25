import '../css/login.css';
import { useState } from 'react';
import { registrarUsuario, loguearUsuario } from '../controller-front/apis/cncApiUsuarios';
import { useNavigate } from 'react-router-dom';



function Login() {
    const [toggleRegistro, setToggleRegistro] = useState(false);
    
    const [emailUserLogin,setEmailUserLogin] = useState('')
    const [passwUserLogin,setPasswUserLogin] = useState('')

    const [nameUserRegister, setNameUserRegister] = useState('');
    const [emailUserRegister, setEmailUserRegister] = useState('');
    const [passwUserRegister, setPasswUserRegister] = useState('');
    const [errorExiste,SetErrorExst] = useState(false);
    const navegar = useNavigate();





    function delayLimpiarERR(){
        setTimeout(()=>{SetErrorExst(false);},1000)
    }



    function handleToggleRegistro() {
        setToggleRegistro(!toggleRegistro);
        
        setEmailUserLogin('');
        setPasswUserLogin('');

        setEmailUserRegister('');
        setNameUserRegister('');
        setPasswUserRegister('');
    }



    function handleLoginEmail(e){
        setEmailUserLogin(e);
     
    }
    function handleLoginPassw(e){
        setPasswUserLogin(e);
     
    }

    //VALIDAR LOGIN
    async function handleLoginVal(e){
        e.preventDefault();
        const credenciales = {
            email: emailUserLogin,
            passw: passwUserLogin
        }
      
        const respuesta = await loguearUsuario(credenciales)
        if (respuesta){
            
            localStorage.setItem('isAuth', true)
            localStorage.setItem('userActivo',JSON.stringify(respuesta))
            navegar('/');
        }else{
            SetErrorExst(true);
            delayLimpiarERR();
        }
    }


    


    function handleRegisterName(e) {
        setNameUserRegister(e);
      
    }

    function handleRegisterEmail(e) {
        setEmailUserRegister(e);
        
    }

    function handleRegisterPassw(e) {
        setPasswUserRegister(e);
        
    }

    //VALIDAR REGISTRO
    async function handleRegisterVal(e){
        e.preventDefault();
        const datosUsuario = {
            nombre: nameUserRegister,
            email: emailUserRegister,
            passw: passwUserRegister
        }

        const credLog = {
            email: emailUserRegister,
            passw: passwUserRegister
        }
        

        const respuesta = await registrarUsuario(datosUsuario);
        if (respuesta){
            const log = await loguearUsuario(credLog)
            if (log){
                
                localStorage.setItem('isAuth', true)
                localStorage.setItem('userActivo',JSON.stringify(log))
                navegar('/');}
        }else{
            SetErrorExst(true);
            delayLimpiarERR();
        }
    }

    return (
        <div className="container-login">
            <div className='contenedor-Login-Registro justify-content-center'>
                <div className='row'>
                    {!toggleRegistro ? <>
                        <div className={`col-12 login login-container ${errorExiste ? 'error': ''} align-items-center align-content-center ${!toggleRegistro ? 'visible' : 'hidden'}`}>
                        <h1 className='tituloLoginReg'>Iniciar sesión</h1>
                        <form onSubmit={handleLoginVal}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={emailUserLogin}
                                    onChange={(e)=>{ handleLoginEmail(e.target.value)}}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={passwUserLogin}
                                    onChange={(e)=>{handleLoginPassw(e.target.value)}}
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
                    <div className={`login registro-container ${errorExiste ? 'error': ''} align-items-center align-content-center ${!toggleRegistro ? 'hidden' : 'visible'}`}>
                        <h1 className='tituloLoginReg'> Registro</h1>
                        <form onSubmit={handleRegisterVal}>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={nameUserRegister}
                                    onChange={(e)=>{handleRegisterName(e.target.value)}}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={emailUserRegister}
                                    onChange={(e)=>{handleRegisterEmail(e.target.value)}}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={passwUserRegister}
                                    onChange={(e)=>{handleRegisterPassw(e.target.value)}}
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

export default Login
