const formatDate = (date:Date = new Date()): string => {
    return `${date.getDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`;
}

export default formatDate;