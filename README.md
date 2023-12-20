
# OpinioNest - A MERN Stack Social Platform for blog posts feed with search and more!




## **Introduction**

Welcome to OpinioNest, a dynamic web application designed to foster meaningful conversations through text posts and comments. OpinioNest allows users to share their thoughts, engage in discussions, and explore diverse perspectives within a user-friendly interface.


## **Demo**

Project Link - https://opinio-nest-client.vercel.app

## **Getting Started**

To personalize your experience, we invite you to signup/login before exploring OpinioNest. Once you've introduced yourself, you can seamlessly navigate through the platform's key features.


## **Features**

#### 1. Create and Share Posts 
OpinioNest enables users to express themselves by creating text posts. Each post includes a user's message and the name of the creator with their profile image, facilitating open communication.

#### 2. Engage with Comments
Users have the ability to engage in conversations by adding comments to any post. Comments capture both the user's message and the creator's name with their image, enhancing the interactive nature of OpinioNest.

#### 3. Posts Feed with Search 
OpinioNest takes user experience a step further by integrating a powerful search functionality. At the top of the posts feed, a text field allows users to search for all posts and search for comments in their perticular comment section/modal. Search results dynamically replace the latest posts, providing a seamless and efficient way to discover relevant content.

#### 4. User-Friendly Display 
When posts are available, OpinioNest displays them prominently. In the absence of posts, the platform encourages users to contribute by creating their own posts.

#### 5. (Bonus) Sign In and Authentication 
OpinioNest ensures a secure and personalized experience through a user-friendly sign-in/login form. Alternatively, users can expedite the login process by opting for Google Authentication, adding an extra layer of convenience and security. 

#### 6. Search Feedback 
OpinioNest enhances user engagement by providing informative feedback during searches. A loading indicator informs users that a search is in progress, and in case no results are found, a message gracefully communicates the absence of relevant content.

#### 7. (Bonus) Loading Indicator  
As a bonus feature, OpinioNest includes a loading indicator during searches, ensuring users are aware of the ongoing search process.


## **Overview**

- Login Page: OpinioNest begins with a user-friendly login page, offering two convenient options: users can sign in or register using their email and password, or opt for a swift sign-in with Google. This initial step ensures a secure and personalized entry into the platform.

- Homepage: The heart of OpinioNest lies in its vibrant homepage, where a feed of posts is prominently displayed. On the right-hand side, a text box beckons users to share their thoughts and create posts seamlessly. This intuitive layout encourages users to engage in meaningful conversations and express themselves freely.

- Search Box: OpinioNest introduces a dynamic search box. Enhancing user experience, this feature is equipped with three icons:
    1.  Search Icon: Enables users to input search queries and find specific posts of interest.
    2. Close Icon: Offers a quick way to erase text from the search box, providing a clean slate for new searches.
    3. Refresh Icon: Allows users to refresh the page, displaying an updated feed of all posts.

- Navbar: The top navigation bar (navbar) is enriched with essential elements. Users' profile photos and usernames. Adjacent to this, the logout button provides a convenient exit point, seamlessly redirecting users to the login or signup page.

- Comment Section: Each post hosts a comment icon leading to a modal housing related comments. Users can post and search comments within the modal, fostering interactive and engaging discussions.




## **Tech Stack**

**Client:** React, Context APIs, Material UI, CSS

**Server:** Node, Express

**Database:** MongoDB

### **Frontend Libraries Employed**

 - [Gapi-script](https://www.npmjs.com/package/gapi-script) : Google's client library for browser-side JavaScript. It's used in Google Sign-in for easily connecting with Google APIs.

### **Backend Libraries Employed**

 - [Bcrypt](https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f) : default password hash algorithm for OpenBSD.


## **Backend APIs**

|    API    |  Method  |   Parameters/Body    |      Purpose      |
| :-------- | :----- | :------------------- | ------------------|
|`/register` | `POST` |{email:String, password: String, name: string}      | used to register user and returns the post|
|`/login`|`POST`|{email:String, password: String}|for authenticating existing user|
|`/google-login`|`POST`|{email:String, name: String, image:string}|for storing data when user signed up using google|
| `/` | `POST` | {userId:ObjectId, text: String}|for posting post data with user's Object id|
| `/` | `GET` | | getting all posts |
| `/:id/comment` | `POST` | {userId: String, text:"string"| post comment on a post|
| `/:id/comments`  | `GET` | |   get all comments of a post|      
|  `/searchpost/:text`  | `GET` | | getting searched posts|
|`/searchcomment/:postId/:text`   | `GET`| |   get all comments for searched comment|


## **Installation**

1. Clone the repo ``` git clone https://github.com/mansi10101/OpinioNest.git ``` 
2. Open root of the project in editor.
3. Route to client directory ``` cd client ```
   ```bash 
    npm install
    npm start 
   ```
4. Open another command prompt.
5. Route server to the backend directory ``` cd server ```
     ```bash 
    npm install
    npm i nodemon
    npm start 
     ```
Please ensure to follow these steps meticulously to set up the application for local development. 
  
    
