const gqlConfig = {
    "language": process.env.REACT_APP_JCONTENT_LANGUAGE,
    "workspace": "LIVE",
    "path": process.env.REACT_APP_JCONTENT_PATH,
    "scope":  "yoda"

}
const gqlConfig_blog = {
    "scope":  "www",
    "language": process.env.REACT_APP_JCONTENT_LANGUAGE,
    "workspace": "LIVE",
    "path": process.env.REACT_APP_JCONTENT_BLOGPATH,
    "cdp_endpoint": process.env.REACT_APP_JCUSTOMER_ENDPOINT,
    "persoId": "5cce4430-962b-4336-a1d9-59e52d5893e2"
}

export {gqlConfig,gqlConfig_blog}