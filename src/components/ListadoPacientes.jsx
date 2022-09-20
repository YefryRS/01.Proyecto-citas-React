import {Paciente} from './Paciente'

const ListadoPacientes = ({pacientes,setPaciente,eliminarPaciente}) => {



  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

      {/* Generamos esta condicion para que el encabezado cambie dependiendo si hay una lista de pacientes o no. */}

      {pacientes.length > 0 ? 
         <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold ">Pacientes y Citas</span>
          </p>

          {/* Esta sera la opcion mas aceptada, pues permitira que se muestre en pantalla lo que hagamos */}
          {/* Cuando vaya a iterar en un componente sera necesario asignar un id unico */}
          {pacientes.map(paciente => ( 
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
              /> 
          ))}
         </>

         :
         <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Agregas tus {""}
            <span className="text-indigo-600 font-bold ">pacientes y apareceran aqui</span>
          </p>
         </>
      }

        
    </div>
  )

}


export {ListadoPacientes}