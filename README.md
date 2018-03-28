# anime-r
### Anime Recommendation/Rater App

#### Project title: 
Anime Recommendations

#### Motivation: 
The purpose of my project was to create an app/webpage where I can list & recommend my favorite anime shows. I can add an anime that I have watched and then leave a description of the show, along with a rating.

#### Build status: 
I've built the basics for the purpose of this project, but plan to build out some of the features of this project to a larger scale. Eventually I'd like to have a search bar/sorting function, a comments section, and user accounts.

#### Technology used: 
I used html, css, javascript, jquery, mLab, mongoose, express, handlebars.

#### Features: 
Your basic CRUD app that can Create, Read, Update & Delete.

#### The app is on a live link, hosted on Heroku: 
(https://anime-r.herokuapp.com/)

But if you want to run it locally, here is the following:

#### Installation for Code Louisville mentors/Brian: 
1. If you do not yet have Nodemon, please make sure to install it globally on your computer. 
2. Download this repository. 
3. In your terminal, navigate to the root folder of this project. 
4. Run `npm install` to install necessary packages.
5. Type `npm run start_dev` in the terminal, it will begin setting up the local server. Wait till it says ```Anime Recommendations is listening on port 8080``` in the terminal.
6. Open up (http://localhost:8080/) in your browser. You will see there is no data showing (*yet!*). This is because I used **dotenv** to password protect the mLab database login/password. I will e-mail Brian, or to whom it may concern, the `.env` file that holds the login/password information. The `.env` needs to be in the root directory. This will allow the Code Louisville viewer to see the project data in the browser on (http://localhost:8080/) for the purpose of this project.
7. Refesh http://localhost:8080/ in your browser. The database should be showing up now.
8. Have fun and recommend a show you like to watch!

#### Project by: Chelsea Niemeier

#### Acknowledgments: 
Bootstrap and Jquery contributed to the styling of the project, with custom CSS sprinkled in. Thank you to my Code Louisville mentors as well for helping me with the foundations. 

#### MIT License

##### Copyright (c) 2018 Chelsea Niemeier

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
