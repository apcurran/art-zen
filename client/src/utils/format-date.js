function formatDate(dateISO) {
    const revisedDate = new Date(dateISO);

    return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(revisedDate);
}

export default formatDate;