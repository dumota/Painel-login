import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { FormEvent, useCallback, useRef } from 'react';
import { Menu } from '../../components/Menu';

interface interfaceProps{
    token?: string;
}

export default function Usuario(props: interfaceProps) {

    const router = useRouter();

    const refForm = useRef<any>();

    const { id } = router.query;

    const submitForm = useCallback((e: FormEvent)=>{
        e.preventDefault();
        if (refForm.current.checkValidity()) {

        }else{
            refForm.current.classList.add('form-valid');
        }
    },[])

    return (
        <>
            <Menu active="usuario" token={props.token}>
                <h1>usuario</h1>

                <form
                        className='row g-3 needs-validation'
                        noValidate
                        ref={refForm}
                    >


                        <div className='col-md-6' >
                            <label htmlFor='nome' className='form-label' >
                                Nome
                            </label>
                            <div className='input-group has-validation' >
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Digite o Nome'
                                    id="nome"
                                    required
                                />
                                <div className='invalid-feedback'>
                                    Por favor digite seu Nome.
                                </div>
                            </div>
                        </div>



                        <div
                            className='col-md-6'
                        >
                            <label
                                htmlFor='email'
                                className='form-label'
                            >
                                Email
                            </label>
                            <div
                                className='input-group has-validation'
                            >
                                <span
                                    className='input-group-text'
                                >@</span>
                                <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Digite o email'
                                    id="email"
                                    required
                                />
                                <div className='invalid-feedback'>
                                    Por favor digite seu email.
                                </div>
                            </div>
                        </div>

                        <div className='col-md-6' >
                            <label htmlFor='telefone' className='form-label' >
                                Telefone
                            </label>
                            <div className='input-group has-validation' >
                                <input
                                    type='tel'
                                    className='form-control'
                                    placeholder='Digite o seu telefone'
                                    id="telefone"
                                    required
                                />
                                <div className='invalid-feedback'>
                                    Por favor digite seu telefone.
                                </div>
                            </div>
                        </div>


                        <div className='col-md-6' >
                            <label htmlFor='cpf' className='form-label' >
                                CPF
                            </label>
                            <div className='input-group has-validation' >
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Digite o seu cpf'
                                    id="cpf"

                                />
                                <div className='invalid-feedback'>
                                    Por favor digite seu cpf.
                                </div>
                            </div>
                        </div>


                        <div className='col-md-6'>
                            <label
                                htmlFor='tipo'
                                className='form-label'
                            >
                                Tipo
                            </label>
                            <select className='form-select' name="tipo" id="tipo" defaultValue={""}>
                                <option value="">Selecione o tipo</option>
                                <option value="admin">Admin</option>
                                <option value="colaborador">Colaborador</option>
                            </select>
                        </div>


                        <div className='col-md-6' >
                            <label htmlFor='endereco' className='form-label' >
                                Endereço
                            </label>
                            <div className='input-group has-validation' >
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Digite o seu endereço'
                                    id="endereco"


                                />
                                <div className='invalid-feedback'>
                                    Por favor digite seu endereço.
                                </div>
                            </div>
                        </div>


                        <div className='col-md-6' >
                            <label htmlFor='bairro' className='form-label' >
                                Bairro
                            </label>
                            <div className='input-group has-validation' >
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Digite o seu bairro'
                                    id="bairro"

                                />
                                <div className='invalid-feedback'>
                                    Por favor digite seu bairro.
                                </div>
                            </div>
                        </div>

                        <div className='col-md-6' >
                            <label htmlFor='numero' className='form-label' >
                                Numero
                            </label>
                            <div className='input-group has-validation' >
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Digite o seu numero'
                                    id="numero"

                                />
                                <div className='invalid-feedback'>
                                    Por favor digite seu numero.
                                </div>
                            </div>
                        </div>


                        <div  className='col-md-12'>
                            <label
                                htmlFor='senha'
                                className='form-label'
                            >
                                Senha
                            </label>
                            <input
                                type="password"
                                className='form-control'
                                placeholder='Digite sua senha'
                                id="senha"
                                required
                            />
                            <div
                                className='invalid-feedback'
                            >
                                Por favor digite sua senha.
                            </div>
                        </div>


                        <div  className='col-md-6'>
                            <button
                                className='btn btn-primary mt-3'
                                type='submit'
                                onClick={(e) => submitForm(e)}
                                id="botao"
                            >
                                Enviar
                            </button>
                        </div>
                </form>
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

    return {
        props : {
            token
        }
    }
}
