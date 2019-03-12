# Server

## Endpoints

### users overview
|Method|Endpoint|Action|Front-end Request|Back-end Response
|------------|------------|------------|------------|------------|
|POST|'api/auth/signup'|sign up new user| {<br/>&nbsp;username: String!<br/>&nbsp;password: String!<br/>}| {<br/>&nbsp;id: Int!<br/>&nbsp;username: String!<br/>&nbsp;token: String!<br/>&nbsp;tokenExpiration: Int!(mins)<br/>}|
|POST|'api/auth/login'|login user| {<br/>&nbsp;username: String!<br/>&nbsp;password: String!<br/>}| {<br/>&nbsp;id: Int!<br/>&nbsp;username: String!<br/>&nbsp;token: String!<br/>&nbsp;tokenExpiration: Int!(mins)<br/>}|
|GET|'/restaurants'|get all taco restaurants||[Restaurant]|
|GET|'/restaurants/:id/reviews'|get all reviews from a restaurant with id|(id in url)|{<br/>&nbsp;...Restaurant<br/>&nbsp;reviews: {<br/>&nbsp;...Original Review<br/>&nbsp;adju_score: Int!<br/>&nbsp;}<br/>}



### data structure
|      |Restaurant|Reviewer|Original Review|
|------|-------|-------|--------------|
|Fields|id: String!<br/>name: String!<br/>true_score: Int!<br/>adju_score: Int!|id: Int!<br/>username: String!|id: String!<br/>reviewer: Reviewer!<br/>review: String!<br/>score: Int!<br/>date_created: Date!<br/>date_updated: Date!|
