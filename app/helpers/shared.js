export const formatDate = (timestamp) => {
    return new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "full",
        timeStyle: "short"
    }).format(new Date(timestamp))
}

export const formatEditDate = (timestamp) => {
    const date = new Date(timestamp)

    const f = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).formatToParts(date)

    // ساخت رشته به صورت دستی
    const day = f.find(p => p.type === "day").value
    const month = f.find(p => p.type === "month").value
    const year = f.find(p => p.type === "year").value
    const hour = f.find(p => p.type === "hour").value
    const minute = f.find(p => p.type === "minute").value

    return `${year}/${month}/${day} - ${hour}:${minute}`
}