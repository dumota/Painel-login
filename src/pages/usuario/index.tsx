import  Head  from 'next/head';
import { useRouter } from 'next/router'
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { Menu } from '../../components/Menu';
import { validaPermissao } from "../../services/validaPermissao";
import { useEffect, useState } from 'react';
import api from '../../services/request';






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





    useEffect(()=>{
        const config = {
            headers: {
                Authorization: `Bearer ${cookies['painel-token']}`,
            },
        };

        api.get(`/usuarios`,config).then(response=>{

            console.log(response.data);
            setUsuario(response.data);

        }).catch((error)=>{

        })
    },[]);

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
                            <button type="button" className="btn btn-success">Adicionar</button>
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
                                        <td>Ações</td>
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

