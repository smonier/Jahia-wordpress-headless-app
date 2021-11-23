import get from "lodash.get";

const BlogMapper = (blogData) => ({
    id: get(blogData, "uuid"),
    title: get(blogData, "title"),
    summary: get(blogData, "summary.value"),
    image: get(blogData, "image.refNode.path"),
    date: get(blogData, "date.value"),
    text: get(blogData, "text.value"),

})

export default BlogMapper;