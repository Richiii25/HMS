function formatDate(dateInput: string | number | Date) {
    if (!dateInput) {
        return '';
    }
    const date = new Date(dateInput);
    const day = date.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export { formatDate };