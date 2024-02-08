import VMasker from "vanilla-masker";
import Normalizer from "./normalizer";

export default class Formatador {

    /**
     * @function
     * @param {string} texto - Texto a ser formatado.
     * @returns {string}
     * @description Formata um número de telefone sem o DDI +55.
     */
    static formataTelefoneBrasil = (texto = '') => {
        try {

            let apenasNumeros = Normalizer.apenasNumeros(texto).toString();
            if (apenasNumeros.length < 13) {
                apenasNumeros = `55${texto}`;
            }
            const valorFormatado = this.formataParaTelefone(apenasNumeros);
            return valorFormatado;
        } catch (error) {
            return texto;
        }
    }

    /**
     * @function
     * @param {string} texto - Texto a ser formatado.
     * @returns {string}
     * @description Formata um número de telefone.
     */
    static formataParaTelefone = (valor = '', comDDI = true) => {
        try {
            if (valor) {
                const valorSemFormatacao = `${valor}`.replace(/[^0-9]/g, '');
                if (comDDI) {
                    if (valorSemFormatacao.length === 13) {
                        return VMasker.toPattern(valorSemFormatacao, '+99 (99) 9 9999-9999');
                    }
                    return VMasker.toPattern(valorSemFormatacao, '+99 (99) 9999-9999');
                }
                return VMasker.toPattern(valorSemFormatacao, '(99) 9 9999-9999');
            }
            return valor;
        } catch (error) {
            return valor;
        }
    };

    /**
     * @function
     * @param {String} point POINT(x,y) 
     * @returns {{ x: Number, y: Number }}
     * @description Recebe uma coordenada no formato POINT(x,y) e devolve um objeto { x, y }
     */
    static formataCoordenadasParaFrontend = (point) => {
        try {
            const [x, y] = point.slice(6, -1).split(',');
            return {
                x: x.parseInt(),
                y: y.parseInt(),
            };
        } catch (error) {
            return point;
        }
    }
}