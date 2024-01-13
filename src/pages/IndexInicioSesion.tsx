import { FaReply, FaEye, FaTimes, FaLock } from "react-icons/fa";
import { useState } from "react";
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
import firebaseConfig from "@/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { restPassword } from "@/components/compIndex/Auth";

export default function IndexInicioSesion() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [VerContrasena, setVerContrasena] = useState(false);
  const [Contrasena, setPassword] = useState("");
  const [Email, setEmail] = useState("");

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpenError, setIsModalOpenError] = useState(false);
  const [dateUser, setDateUser] = useState("");

  const [showError, setShowError] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (Email.trim() === "" || Contrasena.trim() === "") {
        setErrorMessage("Por favor, ingrese todos los datos.");
        setIsModalOpenError(true);
        return;
      }
      await signInWithEmailAndPassword(auth, Email, Contrasena);

      const user = auth.currentUser;
      const userEmail = user?.email;
      const usersRef = collection(db, "Usuario");
      const querySnapshot = await getDocs(
        query(usersRef, where("Email", "==", userEmail))
      );

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const userType = userData.TipoEmpleado;
        if (userType === "Empleado") {
          router.push("/Empleados/ProductosEm");
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
  };

  const closeModalError = () => {
    setIsModalOpenError(false);
    setErrorMessage("hola");
  };

  const InicioLinkClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push("/");
  };

  const verContraseña = () => {
    setVerContrasena(!VerContrasena);
  };

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePasswordReset = async () => {
    if (!Email) {
      setErrorMessage("Por favor ingrese un correo...");

      /*tiempo de mensaje*/
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
      return;
    }

    try {
      await restPassword(Email);
      alert(
        "Se ha enviado un correo electrónico de restablecimiento de contraseña. Por favor, revise su bandeja de entrada."
      );

      closeModalError();
    } catch (error) {
      console.error(
        "Error al enviar el correo de restablecimiento de contraseña",
        error
      );
      alert(
        "Error al enviar el correo de restablecimiento de contraseña" + error
      );
    }
  };

  return (
    <>
      <div className="FondoInicioSecion">
        <div className="contenedorInicio">
          <form className="contenedorFormulario">
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
              <h3 className="texto">Contraseña</h3>
              <div className="inputContenedor">
                <input
                  type={VerContrasena ? "text" : "password"}
                  className="input"
                  value={Contrasena}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="botonVer"
                  type="button"
                  onClick={verContraseña}
                >
                  <FaEye className="ojoPNG"></FaEye>
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="modal-overlay">
                <div className="modal-content2">
                  {showError}
                  <button className=" buttonMas" onClick={closeModal}>
                    {" "}
                    <FaTimes className="ico-close" />
                  </button>

                  <h1 className="texh1Mo">Recuperar contraseña</h1>
                  <div className="form">
                    <input
                      className="user-name"
                      type="text"
                      name="nombreUsuario"
                      placeholder="Ingrese su correo"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button onClick={handlePasswordReset} className="buttonAcep2">
                    Aceptar
                  </button>
                </div>
              </div>
            )}

            <div className="cajax">
              <div className="contenedor-en-fila">
                <a className="IniciarSecionLink" onClick={handleLogin}>
                  Iniciar Sesión
                </a>
                <a className="IniciarSecionLink" onClick={openModal}>
                  Olvidó Contraseña
                </a>
                <a className="IniciarSecionLink" onClick={InicioLinkClick}>
                  Atrás
                </a>
              </div>
              {isModalOpenError && (
                <div className="modalError">
                  <div className="modal-contentError">
                    <p className="pconte">
                      {errorMessage}
                      <button className="closeError" onClick={closeModalError}>
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
