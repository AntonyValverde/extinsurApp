import '@/styles/globals.css'
import '@/styles/indexInicio.css'
import '@/styles/indexInicioSecion.css'
import '@/styles/IndexGerenteInicioDos.css'
import '@/styles/EmpleadosTabla.css'
import '@/styles/registrar.css'
import '@/styles/Productos.css'
import '@/styles/Ubicacion.css'
import '@/styles/Movimientos.css'
import '@/styles/Grafica.css'
import type { AppProps } from 'next/app'
import SidebarProvider from './Gerentes/SidebarContext'

export default function App({ Component, pageProps }: AppProps) {
  return <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  
  
 
}
