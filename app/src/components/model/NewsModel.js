import get from "lodash.get";

const NewsMapper = (newsData) => ({
    id: get(newsData, "uuid"),
    title: get(newsData, "title"),
    description: get(newsData, "description.value"),
    image: get(newsData, "image.refNode.path"),
    created: get(newsData, "created.value")
})

export default NewsMapper;