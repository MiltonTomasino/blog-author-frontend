module.exports.getIndexPage = (req, res) => {
    res.render("index", { title: "Home Page" });
}