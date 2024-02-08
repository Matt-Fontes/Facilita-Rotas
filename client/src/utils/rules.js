import Normalizer from "./normalizer";

export const requiredRule = { required: true, message: 'Campo obrigatório!' };

export const emailRule = {
    pattern: /^[a-zA-Z]+[a-zA-Z0-9._+-]+@([a-zA-Z0-9._-]+\.)[a-zA-Z-0-9]{2,3}/,
    message: 'O e-mail informado é inválido!',
};

export const phoneRule = {
    transform: (value) => Normalizer.apenasNumeros(value),
    pattern: /^([0-9]{10,11}){1}$/g,
    message: 'Telefone inválido!',
};