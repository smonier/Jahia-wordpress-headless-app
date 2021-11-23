import {gql} from '@apollo/client';

export const GET_BLOGPOSTS = gql`
    query getBlogList($workspace: Workspace!, $path: String!, $language: String!) {
        response: jcr(workspace: $workspace) {
            blogList: nodeByPath(path: $path) {
                descendants(
                    typesFilter: {types: ["jcnt:blogEntry"]}
                    fieldSorter: { fieldName: "date.value", sortType: DESC }
                ) {
                    nodes {
                        uuid
                        title: displayName(language: $language)
                        date: property(language: $language,name: "date"){ value }
                        image: property(name: "image") { refNode {path} }
                        summary: property(language: $language,name: "summary"){ value }
                        text: property(language: $language,name: "text"){ value }
                        created: property(name: "jcr:created") { value }
                        publishedDate: property(name: "jcr:lastModified") {value}
                        publishedBy: property(name: "jcr:lastModifiedBy") {value}
                        tags: property(language: $language, name: "j:tagList") {values}
                        categories: property(language: $language, name: "j:defaultCategory") {values}
                        interests: property(name: "wem:interests") {values}
                    }
                }
            }
        }
    }
`
