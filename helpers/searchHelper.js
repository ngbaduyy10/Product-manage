module.exports = (query) => {
    let title = "";
    if (query.keyword) {
        title = new RegExp(query.keyword, 'i');
    }
    return title;
}