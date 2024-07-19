module.exports = (pagination, count) => {
    return {
        limit: pagination.limit,
        skip: (pagination.currentPage - 1) * pagination.limit,
        totalPage: Math.ceil(count / pagination.limit),
        currentPage: pagination.currentPage,
    }
}