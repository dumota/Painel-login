import 'bootstrap/dist/css/bootstrap.min.css';
import { AutenticacaoProvider } from '../contexts/AutenticacaoContext';
import '../../src/styles/styles.css';
import { Loading } from '../components/Loading';

function MyApp({ Component, pageProps }) {
  return (
        <AutenticacaoProvider>
            <Loading/>
            <Component {...pageProps} />f
        </AutenticacaoProvider>

  )
}

export default MyApp
