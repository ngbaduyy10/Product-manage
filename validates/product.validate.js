module.exports.createPost = async (req, res, next) => {
    if (!req.body.title) {
        req.flash('info', 'Title is required!');
        res.redirect('back');
        return;
    }
    next();
}