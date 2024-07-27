const Category = require("../models/category.model");

module.exports. getSub = async (parentId) => {
    const getSubCategory = async (parentId) => {
        const subs =  await Category.find({ parentId: parentId, deleted: false });
        let allSubs = [...subs];
        for (let sub of subs) {
            allSubs = [...allSubs, ... await getSubCategory(sub.id)];
        }
        return allSubs;
    }
    const allSubs = await getSubCategory(parentId);
    return allSubs;
}