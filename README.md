# blog-backend

POST /register
body required {name, email, password}
used to register as a user

POST /login
body required {email, password}
used to login and obtain an authentication token

Note: All routes below requires token to be set in the header as token.


GET /
shows a list of blogs posts with blog head and blog body.
E.g
GET /
content-type: application/json,
token: thetoken


POST /
body required {bloghead, blogbody}
Used to add a blog with a blog head and blog body property
E.g
POST /
content-type: application/json
token: thetoken
{
    "bloghead":"New Blog title",
    "blogbody": "New Blog body"
}


PUT /edit-blog/:id
body required {bloghead, blogbody}
edits a single blog post that contains a blog head and a blog body with the id passed as a parameter.
E.g
PUT /edit-blog/:id
content-type: application/json
token: thetoken
{
    "bloghead":"Edited Blog title",
    "blogbody": "Edited Blog body"
}


DELETE /:id
deletes a single blog post with the id passed as a parameter

GET /users/profile
gets the user's profile details

PUT /users/edit-status
edits the users status and requires updateStatus on the body of the request which will have the value of the status to be updated.

GET /view-blogger-profile/:id
View the profile and status of the user with the user ID. The user id can be gotten from the 'userID' property of records from  'GET /' route.

GET /single-blog/:id
This returns a single blog that matches the params id passed to it.