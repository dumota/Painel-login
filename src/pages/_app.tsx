import 'bootstrap/dist/css/bootstrap.min.css';
import { AutenticacaoProvider } from '../contexts/AutenticacaoContext';
import '../../src/styles/styles.css';

function MyApp({ Component, pageProps }) {
  return (
        <AutenticacaoProvider>
            <Component {...pageProps} />f
        </AutenticacaoProvider>

  )
}

export default MyApp
