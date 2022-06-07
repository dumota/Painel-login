import jwt_decode from 'jwt-decode';

export const validaPermissao = (token: string| undefined, permissao: Array<string>):boolean =>{
    if(token){
        const user = jwt_decode<[
            id: number,
            nome: string,
            email: string,
            permissao: string,
        ]>(token);



        const temPermissao = permissao.includes(user.permissao);

        if (temPermissao) {
            return true;
        }




    }

    return false;
}

