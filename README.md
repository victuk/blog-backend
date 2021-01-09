# blog-backend

POST /register
body required {name, email, password}

POST /login
body required {email, password}

GET /
shows a list of blogs posts with blog head and blog body

POST /
body required {bloghead, blogbody}

PUT /:id
body required {bloghead, blogbody}
edits a single blog post with the id passed as a parameter

DELETE /:id
deletes a single blog post with the id passed as a parameter
