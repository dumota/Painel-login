
import {Menu} from "../../components/Menu"
import Head from "next/head"
import { useEffect } from "react"
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { validaPermissao } from "../../services/validaPermissao";

interface interfaceProps{
    token?: string;
}

export default function Dashboard(props: interfaceProps) {



    return (
        <>
            <Head>
                <title>Dashboard</title>

            </Head>
            <Menu active="dashboard" token={props.token}>
                <>
                    <div className={"d-flex justify-content-between flex-wrap  flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"}>
                        <h2>DashBoard</h2>
                        <div className={"btn-toolbar mb-2 mb-0 "}>
                            <button type="button">Teste</button>
                        </div>
                    </div>
                </>
            </Menu>
        </>
    )
}


//lado back and next
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

    return {
        props : {
            token
        }
    }
}
