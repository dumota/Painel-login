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







export default function Usuario(props: interfaceProps) {

    const [usuario, setUsuario] = useState([]);
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
                <h1>Usuarios</h1>
                {usuario.map((user) => {
                    return (
                       <ul>
                           <li>
                               <p>Nome: {user.nome}</p>
                               <p>Tipo: {user.tipo}</p>
                               <p>Email: {user.email}</p>
                               <p>Telefone: {user.telefone}</p>
                               <p>CPF: {user.cpf}</p>
                               <p>Endereço{user.endereco}</p>
                               <p>Bairro{user.bairro}</p>

                           </li>
                       </ul>

                    )
                })}
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

