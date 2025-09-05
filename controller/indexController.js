function formattedBlogDates(blogs) {
    return blogs.map(blog => {
        const createdAt = new Date(blog.createdAt);
        const now = new Date();
        const diffMs = now - createdAt;
        const diffHrs = diffMs / (1000 * 60 * 60);
        let formattedDate;
        if (diffHrs > 24) {
            formattedDate = createdAt.toLocaleString("en-us", {
                year: "2-digit",
                month: "numeric",
                day: "numeric",
            });
        } else {
            formattedDate = `${Math.floor(diffHrs)}h`;
        }
        return {...blog, formattedDate };
    })
}

module.exports.getIndexPage = async (req, res) => {

    const blogs = await fetch("http://localhost:3000/blog")
        .then(res => res.json())
        .catch(err => console.error("Error fetching blogs:", err));
    // console.log(blogs);
    const formatBlogDates = formattedBlogDates(blogs);
    res.render("index", { title: "Home Page", blogs: formatBlogDates });
}