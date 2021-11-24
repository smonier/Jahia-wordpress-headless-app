import {gql} from '@apollo/client';

export const GET_BLOG_DETAIL = gql`
    query getBlogDetail($workspace: Workspace!, $blogId: String!, $language: String!) {
        response: jcr(workspace: $workspace) {
            blog: nodeById(uuid: $blogId) {
                blogId: uuid
                title: displayName(language: $language)
                date: property(language: $language,name: "date") {value}
                image: property(name: "image") { refNode {path} }
                summary: property(language: $language,name: "summary") {value}
                text: property(language: $language,name: "text") {value}
                publishedDate: property(name: "jcr:lastModified") {value}
                publishedBy: property(name: "jcr:lastModifiedBy") {value}
                tags: property(language: $language, name: "j:tagList") {values}
                categories: property(language: $language, name: "j:defaultCategory") {nodes: refNodes {value: displayName}}
                interests: property(name: "wem:interests") {values}
            }
        }
    }
`