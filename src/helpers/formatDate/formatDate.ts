import { format, parseISO } from 'date-fns';

const formatDate = (dateString: string) => format(parseISO(dateString), 'dd/MM/yyyy');

export default formatDate;