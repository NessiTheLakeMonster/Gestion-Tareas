export interface UsuarioLogin {
    email: string,
    password: string
}


export interface AccesoUsuario {
    msg?: string;
    token: string;
    usuario: UsuarioLogin;
}