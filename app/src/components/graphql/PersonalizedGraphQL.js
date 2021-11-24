import {gql} from '@apollo/client';

export const GET_PERSONALIZED_RESULT = gql`
    query getPersonalizedResultHero(
        $workspace: Workspace!
        $persoId: String!
        $language: String!
        $profileId: String
        $sessionId: String
    ) {
        response: jcr(workspace: $workspace) {
            result: nodeById(uuid: $persoId) {
                jExperience: jExperience(profileId: $profileId, sessionId: $sessionId) {
                    variant: personalizedVariant {
                        id: uuid
                        title: displayName(language: $language)
                        image: property(name: "image") {
                            refNode {
                                path
                            }
                        }
                        subTitle: property(language: $language, name: "subTitle") {
                            value
                        }
                        textColor: property(language: $language, name: "textColor") {
                            value
                        }
                    }
                }
            }
        }
    }
`


