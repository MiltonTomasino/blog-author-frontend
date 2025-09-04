module.exports.getIndexPage = async (req, res) => {

    const blogs = await fetch("http://localhost:3000/blog")
        .then(res => res.json())
        .catch(err => console.error("Error fetching blogs:", err));
    // console.log(blogs);
    res.render("index", { title: "Home Page", blogs: blogs });
}