import  Head  from 'next/head';
import { useRouter } from 'next/router'
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { Menu } from '../../components/Menu';
import { validaPermissao } from "../../services/validaPermissao";
import { useContext, useEffect, useState } from 'react';
import api from '../../services/request';
import { AutenticacaoContext } from '../../contexts/AutenticacaoContext';






interface interfaceProps{
    token?: string;
}


interface interfaceUsuario{
    bairro?: string,
    cpf?: string,
    email: string,
    endereco?: string,
    id: number,
    nome: string,
    numero?: string,
    telefone: string,
    tipo: string,
}








export default function Usuario(props: interfaceProps) {

    const [usuario, setUsuario] = useState<Array<interfaceUsuario>>([]);
    const cookies = parseCookies();
    const {setLoading} = useContext(AutenticacaoContext);


    async function deleteUser (user: interfaceUsuario) {
        const id = user.id ? user.id :null ;
        setLoading(true);
        await api.delete(`usuarios/${id}`,{
            headers:{
                Authorization : `Bearer ${props.token}`
            }
        }).then((res)=>{
            console.log(res);
           
           
            
        }).catch((err)=>{
            console.log(err);
            
        })
    
        await api.get('/usuarios', {
            headers:{
                Authorization : `Bearer ${props.token}`
            }
        }).then((res)=>{
            setUsuario(res.data);
             setLoading(false);
            
        })
        
    }




    useEffect(()=>{
        const config = {
            headers: {
                Authorization: `Bearer ${cookies['painel-token']}`,
            },
        };

        setLoading(true)
        api.get(`/usuarios`,config).then(response=>{
            
            setUsuario(response.data);
            setLoading(false);

        }).catch((error)=>{

        })
        
      
        
        
    }, []);

    const router = useRouter();

    return (
        <>
            <Head>
                <title>Usuario</title>
            </Head>

            <Menu active="usuario" token={props.token}>
                <>
                <div className={"d-flex justify-content-between flex-wrap  flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"}>
                        <h2>Usuario</h2>
                        <div className={"btn-toolbar mb-2 mb-0 "}>
                            <button type="button" className="btn btn-success"
                            onClick={()=>{router.push('/usuario/adicionar')}}
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>


                       <table className="table table-striped">
                           <thead>
                               <tr>
                                   <th>ID</th>
                                   <th>Nome</th>
                                   <th>Email</th>
                                   <th>Açoes</th>

                               </tr>
                           </thead>
                           <tbody>
                           {
                               usuario.map((user, index) =>{
                                   return(
                                    <tr key={user.id}>
                                        <td>ID: {user.id}</td>
                                        <td>Nome: {user.nome}</td>
                                        <td>Email: {user.email}</td>
                                        <td>
                                            <button className="btn btn-primary " onClick={() =>{
                                                router.push('/usuario/' + user.id)
                                            }} style={{marginLeft:5}}>
                                                Editar
                                             </button>

                                            <button className="btn btn-danger" onClick={() =>{
                                                deleteUser(user);
                                            }}>
                                                Deletar

                                            </button>
                                        </td>
                                    </tr>
                                   )
                                })
                           }


                           </tbody>

                       </table>



                </>
            </Menu>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (contexto)=>{

    const {'painel-token': token} = parseCookies(contexto);
    console.log(token);

    if (!token) {
            return{
                redirect:{
                    destination: '/login',
                    permanent: false
                }
            }
    }

    const temPermissaoPage = validaPermissao(token, ['admin']);

    if (!temPermissaoPage) {
        return{
            redirect:{
                destination: '/dashboard',
                permanent: false
            }
        }
    }

    return {
        props : {
            token
        }
    }
}

