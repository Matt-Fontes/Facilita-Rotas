export default class Normalizer {

    /**
     * @function
     * @param {string} texto - Texto a ser formatado.
     * @returns {string}
     * @description Remove qualquer coisa que não seja um número.
     */
    static apenasNumeros = texto => {
        try {
            return texto.replace(/[^0-9]/g, '');
        } catch (error) {
            return texto;
        }
    }

}