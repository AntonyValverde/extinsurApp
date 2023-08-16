import '@/styles/globals.css'
import '@/styles/IndexInicio.css'
import '@/styles/IndexInicioSecion.css'
import '@/styles/IndexGerenteInicio.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
