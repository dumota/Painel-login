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
    setLoading :Function ;
    loading: boolean;
}

export const AutenticacaoContext = createContext({} as InterfaceAutenticacaoContext);

interface InterfaceProviderProps{
    children: ReactNode;
}

export function AutenticacaoProvider({children}: InterfaceProviderProps){
const router = useRouter();
const [usuario, setUsuario] = useState();
const [loading, setLoading] = useState<boolean>(false);


async function logar(dados: InterDados) {
    try {
        setLoading(true)
        await api.post('/login', dados).then((res)=>{
           
            
            setCookie(
                undefined,
                'painel-token',
                res.data.token,
      
    
    
            )
        });
        setLoading(false);
        router.push('/dashboard');
    } catch (error) {

    }
}


    return(
        <AutenticacaoContext.Provider value={{
            logar , loading , setLoading
        }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}


