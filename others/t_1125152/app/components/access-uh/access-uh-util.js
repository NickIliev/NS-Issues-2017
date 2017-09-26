exports.initializeExploreHealth = function (page, viewModel) {
    viewModel.set("showBlogArrow", {
        Previous: false,
        Next: true
    });

    var blogPrevious = page.getViewById("blogPrevious");
    blogPrevious.off("tap");
    blogPrevious.on("tap", function (args) {
        console.log("blog prev tap");
        viewModel.set("showBlogArrow", {
            Previous: false,
            Next: true
        });
    });

    var blogNext = page.getViewById("blogNext");
    blogNext.off("tap");
    blogNext.on("tap", function (args) {
        console.log("blog next tap");

        // TODO: get next set of items
        // show blog item loaders and then hide when http call complete
        viewModel.set("showBlogArrow", {
            Previous: true,
            Next: true
        });
    });
};

exports.blogItemTap = function (args) {
    console.log("test method reached!");
    console.log(args.view);
};
