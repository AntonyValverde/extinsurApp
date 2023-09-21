import { FaReply, FaEye, FaTimes } from 'react-icons/fa'
import { useState } from 'react';
import { useRouter } from "next/router";
import "firebase/firestore";
import "firebase/compat/firestore";
import {
    getFirestore,
    collection,
    getDocs,
    where,
    query,
} from "@firebase/firestore";
import firebaseConfig from '@/firebase/config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';


export default function IndexInicioSesion() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    const [VerContrasena, setVerContrasena] = useState(false);
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [SelectedOption, setSelectedOption] = useState('Opciones');
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpenError, setIsModalOpenError] = useState(false);
    const [dateUser, setDateUser] = useState("");


    const handleLogin = async () => {
        try {
            if (Email.trim() === "" || Password.trim() === "") {
                setErrorMessage("Por favor, ingrese todos los datos.");
                setIsModalOpenError(true);
                return;
            }
            await signInWithEmailAndPassword(auth, Email, Password);

            const user = auth.currentUser;
            const userEmail = user?.email;
            const usersRef = collection(db, "Usuarios");
            const querySnapshot = await getDocs(
                query(usersRef, where("Email", "==", userEmail))
            );

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                const userType = userData.Tipo;
                if (userType === "Empleado") {
                    router.push("/Empleados/GraficaEmpleados");
                } else if (userType === "Gerente") {
                    router.push("/Gerentes/Empleados");
                } else {
                    setErrorMessage("Correo no encontrado.");
                    setIsModalOpenError(true);
                }
            } else {
                setErrorMessage("Correo/Contraseña incorrectos..");
                setIsModalOpenError(true);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Correo/Contraseña incorrectos.");
            setIsModalOpenError(true);
        }
    }



    const closeModalError = () => {
        setIsModalOpenError(false);
        setErrorMessage("hola");
    };









    const InicioLinkClick = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        router.push("/");
    };

    /*const handleLogin = () => {
    
    
        if (!Email.trim() || !Password.trim()) {
            alert('Por favor, completa todos los campos.');
            return;
        }  
         
        if(SelectedOption === ""){
            console.log('Ingresa un rol')
            
        }else if(SelectedOption === "Gerente"){
            router.push("/Gerentes/Empleados"); 
            console.log('Gerente', SelectedOption)
        }else if(SelectedOption === "Empleado"){
            router.push("/IndexEmpleadoInicio");  
            console.log('Empleado', SelectedOption)
        }
        
        
    };*/

    const verContraseña = () => {
        setVerContrasena(!VerContrasena);
    };

    const opcionElegida = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="FondoInicioSecion">

                <div className="contenedorInicio">

                    <form className="contenedorFormulario">
                        <nav className="navegationSecion">
                            <button className="buttonBorderAtras" onClick={InicioLinkClick}>

                                <FaReply className="iconsSalir"></FaReply>
                            </button>
                        </nav>
                        <h1 className="titulo">ExtinSur Login</h1>
                        <div className="caja">
                            <h3 className="texto">Email</h3>
                            <input
                                type="text"
                                className="input"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="caja">
                            <h3 className="texto" >Contraseña</h3>
                            <div className="inputContenedor">
                                <input
                                    type={VerContrasena ? 'text' : 'password'}
                                    className="input"
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="botonVer" type="button" onClick={verContraseña} >
                                    <FaEye className="ojoPNG"></FaEye>
                                </button>
                            </div>

                        </div>
                        <div className="caja">
                            <div className="contenedorOpcion">
                                <a href='#' className="botonOpcion">{SelectedOption}<></></a>
                                <div className="opcionContenido">
                                    <a onClick={() => opcionElegida('Empleado')}>Empleado</a>
                                    <a onClick={() => opcionElegida('Gerente')}>Gerente</a>
                                </div>
                            </div>
                        </div>
                        <div className="cajax">
                            <a className="IniciarSecionLink" onClick={handleLogin}>Iniciar Sesión</a>
                            {isModalOpenError && (
                                <div className="modalError">
                                    <div className="modal-contentError">
                                        <p className="pconte">
                                            {errorMessage}
                                            <button
                                                className="closeError"
                                                onClick={closeModalError}>
                                                <FaTimes />
                                            </button>
                                        </p>

                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}