import {gql} from '@apollo/client';

export const GET_NEWS = gql`
    query getNewsList($workspace: Workspace!, $path: String!, $language: String!) {
        response: jcr(workspace: $workspace) {
            newsList: nodeByPath(path: $path) {
                children(
                    typesFilter: {types: ["jnt:news"]}
                    fieldSorter: { fieldName: "created.value", sortType: DESC }
                ) {
                    nodes {
                        uuid
                        title: displayName(language: $language)
                        image: property(name: "image") { refNode {path} }
                        description: property(language: $language,name: "desc"){ value }
                        created: property(name: "jcr:created") { value }
                        tags: property(language: $language, name: "j:tagList") {
                            values
                        }
                        categories: property(language: $language, name: "j:defaultCategory") {
                            values
                        }
                        interests: property(name: "wem:interests") {
                            values
                        }
                    }
                }
            }
        }
    }
`
