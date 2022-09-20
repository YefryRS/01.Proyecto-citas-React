//Esta es otra manera de pasar props, usando algo llamado children
//De esta manera lee todo lo que haya dentro del prop, y es util cuando vamos a escribir bastante codigo
const Error = ({children}) => {

  return (
    <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
        {children}  
    </div>
  )

}

export {Error}