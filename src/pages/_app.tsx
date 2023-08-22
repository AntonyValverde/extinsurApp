import '@/styles/globals.css'
import '@/styles/indexInicio.css'
import '@/styles/indexInicioSecion.css'
import '@/styles/indexGerenteInicio.css'
import '@/styles/EmpleadosTabla.css'
import '@/styles/registrar.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
