export const formatDate = (timestamp) => {
    return new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "full",
        timeStyle: "short"
    }).format(new Date(timestamp))
}