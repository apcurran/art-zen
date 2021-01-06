import { format, parseISO } from "date-fns";

function formatDate(date) {
    return format(parseISO(date), "MMM do, yyyy");
}

export default formatDate;