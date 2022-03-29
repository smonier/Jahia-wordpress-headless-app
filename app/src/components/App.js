import React, {Component} from 'react';
import {syncTracker} from "../misc/tracker";

import Blogs from './Blogs';
import News from './News'
import {gqlConfig_blog} from "./gql.config";
import uTracker from "unomi-analytics";

//Init unomi tracker
if (gqlConfig_blog.workspace === "LIVE")
    syncTracker({
        scope: gqlConfig_blog.scope,
        url: gqlConfig_blog.cdp_endpoint,
        sessionId: window.sessionId
    });

class App extends Component {

    state = {
        tagList: ["tags"],
        profileId: null,
        sessionId: null
    };

    componentDidMount() {
        uTracker.ready(() => {
            console.log(
                `App: profileId: ${window.cxs.profileId}, sessionId=${
                    window.cxs.sessionId
                }`
            );
            if (!window.cxs.profileId || !window.cxs.sessionId) {
                console.error("unomi wasn't initialized");
                return;
            }
            this.setState({
                profileId: window.cxs.profileId,
                sessionId: window.cxs.sessionId
            });
        });
    }

    handleChange(e) {
        console.log(e.target.value)
    }

    render() {
        const { profileId, sessionId } = this.state;

        /*      return <Blogs
                 profileId={profileId}
                 sessionId={sessionId}
             />;*/
               return <News
                    profileId={profileId}
                    sessionId={sessionId}
                />
        ;
    }
}

export default App;