const gqlConfig = {
    "scope": process.env.REACT_APP_JCONTENT_SITE,
    "language": process.env.REACT_APP_JCONTENT_LANGUAGE,
    "workspace": "LIVE",
    "path": process.env.REACT_APP_JCONTENT_PATH
}
const gqlConfig_blog = {
    "scope":  "www",
    "language": process.env.REACT_APP_JCONTENT_LANGUAGE,
    "workspace": "LIVE",
    "path": process.env.REACT_APP_JCONTENT_BLOGPATH,
    "cdp_endpoint": process.env.REACT_APP_JCUSTOMER_ENDPOINT,
    "persoId": "1af5cff1-e0aa-43b5-9f16-16b2532fb46b"
}

export {gqlConfig,gqlConfig_blog}