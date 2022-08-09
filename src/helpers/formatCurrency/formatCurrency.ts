import numeral from 'numeral';
import 'numeral/locales/pt-br';

numeral.locale('pt-br');

const formatCurrency = (value: number) => numeral(value).format('$ 0,0.00');

export default formatCurrency;