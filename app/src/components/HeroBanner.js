import React from "react";
import '../assets/css/HeroBanner.css';
import {gqlConfig_blog} from "./gql.config";
import {useQuery} from "@apollo/client";
import {GET_PERSONALIZED_RESULT} from "./graphql/PersonalizedGraphQL";
import {Card, CardMedia, Box, Typography} from "@mui/material";

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    card: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white'
    }
}
const HeroBanner = (props) => {
    let {profileId, sessionId} = props;
    const variables = Object.assign(gqlConfig_blog, {profileId: profileId, sessionId: sessionId})
    const {loading, error, data} = useQuery(GET_PERSONALIZED_RESULT, {
        variables: variables,
    });

    const [hero, setHero] = React.useState([]);

    React.useEffect(() => {
        if (loading === false && data) {
            const heroNode = data.response.result.jExperience.variant;
            let item = [];
            item = {
                id: heroNode.id,
                title: heroNode.title,
                subTitle: heroNode.subTitle && heroNode.subTitle.value,
                textColor: heroNode.textColor && heroNode.textColor.value,
                image: process.env.REACT_APP_JCONTENT_FILES_ENDPOINT + `${heroNode.image.refNode.path}`
            }
            setHero(item);
        }
    }, [loading, data]);

    if (loading) return <img src={`https://giphy.com/embed/3o7bu3XilJ5BOiSGic`} alt="loading" width="480"
                             height="480"/>;
    if (error) return <p>Error ${error}</p>;


    return (


    <Card sx={{ minHeight: 345 }}>
        <Box sx={{ position: 'relative' }}>
            <CardMedia
                component="img"
                height="345"
                image={hero.image}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.54)',
                    color: 'white',
                    padding: '10px',
                }}
            >
                <Typography variant="h5">{hero.title}</Typography>
                <Typography variant="body2">{hero.subTitle}</Typography>
            </Box>
        </Box>
    </Card>


)


}


export default HeroBanner