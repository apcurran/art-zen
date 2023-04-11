const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

function formatDate(dateISO) {
    const revisedDate = new Date(dateISO);

    return dateFormatter.format(revisedDate);
}

export default formatDate;