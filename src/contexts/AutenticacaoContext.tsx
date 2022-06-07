import axios from "axios";
import { useRouter } from "next/router";
import { createContext , ReactNode, useState } from "react";
import { setCookie} from 'nookies';
import api from "../services/request"

interface InterDados{
    email: string;
    senha: string;
}

interface InterfaceAutenticacaoContext{
    logar(dados): Promise<void>;
}

export const AutenticacaoContext = createContext({} as InterfaceAutenticacaoContext);

interface InterfaceProviderProps{
    children: ReactNode;
}

export function AutenticacaoProvider({children}: InterfaceProviderProps){
const router = useRouter();
const [usuario, setUsuario] = useState();

async function logar(dados: InterDados) {
    try {
        let resultado = await api.post('/login', dados);

        console.log(resultado);
        setCookie(
            undefined,
            'painel-token',
            resultado.data.token,


        )


        router.push('/dashboard');



    } catch (error) {

    }
}


    return(
        <AutenticacaoContext.Provider value={{logar}}>
            {children}
        </AutenticacaoContext.Provider>
    )
}


