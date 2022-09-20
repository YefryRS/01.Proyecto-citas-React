import { useState, useEffect } from "react"
import {Error} from './Error'

/* NOTAS
1. Los eventos en react funcionan parecido a JS.
2. El state se modifica por medio de el hook useState
*/

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  //El state siempre va al inicio del componente
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("")
  const [email, setEmail] = useState("")
  const [fecha, setFecha] = useState("")
  const [sintomas, setSintomas] = useState("")

  const [error, setError] = useState(false)

  // El useEffect siempre es un callback, que se ejecuta cuando un state cambia o cuando el componente esta listo
  //Si lo mandamos con dependencia se ejecutara cada vez que esa dependencia sufra algun cambio

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {

      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])

  // si lo mandamos sin dependencias, se ejecutara una sola vez
/*   useEffect(() => {
    console.log("el componente esta listo")
  }, []) */
  

  //Id para el map del componente "ListadoPacientes"
  const generarID = () => {
    const ramdom = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return ramdom + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //Validacion del Formulario
    if([nombre,propietario,email,fecha,sintomas].includes("")) {

      setError(true)
      return;
    }
    setError(false)

    //Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id) {
      //Editando el registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})

    }else {
      //Nuevo registro

      //Pasamos una copia, y luego el objeto que deseamos añadir
      objetoPaciente.id = generarID();
      setPacientes([...pacientes,objetoPaciente])
    }


    //Reinicar el formulario despues de añadir un paciente
    setNombre("")
    setPropietario("")
    setEmail("")
    setFecha("")
    setSintomas("")

    
  }


  return (
    <div className="md:w-1/2 lg:w-2/5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>   
        <p className="text-lg mt-5 text-center mb-10"> 
        Añade Pacientes y {""} 
        <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
          //Si vamos a crear un evento con varias lineas, lo mejor es crear una funcion fuera del return
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
        >

          {/* Utilizamos condicionales para que a la hora de enviar muestro un mensaje */}
          {/* Usando props con "children", asi podemos usar mas codigo, como se esta viendo en la linea de abajo, para usarlo de esta manera, tendremos si o si que tener etiqueta de apertura y cierre */}
          {error && <Error><p>Todos los campos son obligatorios</p></Error>}

          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
              Nombre Mascota
            </label>
            <input 
              id="mascota"
              type="text"
              placeholder="Nombre de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              //Asi modificamos un input con React
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} // evento de react, para modificar el state, al ser un evento que se ejecuta como callback podemos usarlo asi
              />
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
              Nombre Propietario
            </label>
            <input 
              id="propietario"
              type="text"
              placeholder="Nombre del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
              />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
              Email
            </label>
            <input 
              id="email"
              type="email"
              placeholder="Email Contacto propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
              Alta
            </label>
            <input 
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              />
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
              Sintomas
            </label>
            <textarea 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
              id="sintomas" 
              placeholder="describe los sintomas" 
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>

          <input 
            type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
            // Usamos condicionales para que condicionar el mensaje de el boton
            value={paciente.id ? "Editar paciente" : "Agregar paciente"}
          />
        </form>
    </div>
  )
}


export {Formulario} 