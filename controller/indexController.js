module.exports.getIndexPage = async (req, res) => {
    res.render("index", { title: "Home Page" });
}