var Category = (function () {
    return function Category(categoryData) {
        return {
            idCategory: categoryData.idCategory,
            name: categoryData.name,
            hasChildren: categoryData.hasChildren,
            countStories: categoryData.countStories
        };
    };
})();

module.exports = Category;