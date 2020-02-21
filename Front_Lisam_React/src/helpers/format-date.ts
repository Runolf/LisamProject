const formatDate = (date:Date = new Date()): string => {
    return date.getFullYear().toString();  
}

export default formatDate;