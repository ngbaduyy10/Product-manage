const createTree = (data, parentId = '') => {
    let tree = [];
    let category = data.filter(item => item.parentId === parentId);
    if (category.length > 0) {
        category.forEach(item => {
            let children = createTree(data, item.id);
            if (children.length > 0) {
                item.children = children;
            }
            tree.push(item);
        });
    }
    return tree;
}

module.exports.tree = (data, parentId = '') => {
    return createTree(data, parentId);
}