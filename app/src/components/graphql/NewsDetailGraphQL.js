import {gql} from '@apollo/client';

export const GET_NEWS_DETAIL = gql`
    query getNewsDetail($workspace: Workspace!, $newsId: String!, $language: String!) {
        response: jcr(workspace: $workspace) {
            news: nodeById(uuid: $newsId) {
                newsId: uuid
                title: displayName(language: $language)
                image: property(name: "image") { refNode {path} }
                description: property(language: $language,name: "desc") {
                    value
                }
                publishedDate: property(name: "jcr:lastModified") {value}
                publishedBy: property(name: "jcr:lastModifiedBy") {value}
                media: property(language: $language, name: "wden:mediaNode") {
                    node: refNode {
                        id: uuid
                        type: primaryNodeType {
                            value: name
                        }
                        mixins: mixinTypes {
                            value: name
                        }
                        path
                    }
                }
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
`