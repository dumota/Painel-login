import Link from "next/link";
import Router from "next/router";
import { ReactNode, useContext } from "react"
import { Cookies } from "react-cookie";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { validaPermissao } from "../../services/validaPermissao";



interface IntefacaProps{
    children: ReactNode;
    active: string;
    token?: string;

}



export const Menu = ({children, active, token}:IntefacaProps) => {

       const {setLoading} = useContext(AutenticacaoContext);
       function logout() {
        setLoading(true);
        var coockies = document.cookie.split(";");
        for (let index = 0; index < coockies.length; index++) {
            var cookie = coockies[index];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";  
            
                    
        }
        
        setLoading(false);
        Router.push('/login');
 
    }
  



    return (
        <>
        
        <header
             className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
        >

            <a
                href="#" className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
            >
                Sistema de Autenticação
            </a>
            <div className="navbar-nav ">
                <div className="nav-item text-nowrap">
                    <a href="#" onClick={logout} className="nav-link px-3">Sair</a>
                </div>
            </div>
        </header>

        <div className="container-fluid ">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
                    <ul className="nav flex-column">

                        {
                            validaPermissao(token, ['admin' , 'colaborador']) &&
                            <li className="nav-item">
                                <Link href={'/dashboard'}>
                                    <a href="#" className={`nav-link ${active === 'dashboard' && 'active'}`}>
                                        <span data-feather="home"></span>
                                        Dashboard
                                    </a>
                                </Link>

                            </li>
                        }
                        {
                            validaPermissao(token, ['admin']) &&
                             <li>
                             <Link href={'/usuario'}>
                                 <a href="#" className={`nav-link ${active === 'usuario' && 'active'}`}>
                                     <span data-feather="home"></span>
                                     Usuario
                                 </a>
                             </Link>
                         </li>
                        }


                    </ul>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    { children }
                </main>
            </div>
        </div>
        </>
    )
}
