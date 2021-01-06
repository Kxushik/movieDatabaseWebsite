
//Load Initial JSON Files

let users = require("../users.json");
let movies = require("../movie-data-short.json");
const { title } = require("process");
const e = require("express");

//Lets user signup
function userSignUp(newUser){
    if(users.hasOwnProperty(newUser.username)){
        console.log("Username already exists.");
        return null;
    }

    //Set JSON parameters to empty
    newUser.status = "online";
    newUser.following = [];
    newUser.followers = [];
    newUser.review = [];
    newUser.movieList  = [];
    newUser.watchlist =[];
    users[newUser.username] = newUser;
    
    return users[newUser.username];
}

function logIn(obj,user,pass){
    let found = false;
    for (var i in obj){
        if(obj[i]['username']==user && obj[i]['password']===pass){
            obj[i]['status'] = "online";
            console.log("Successful Log In");
            found=true;
        }
    }
    if(!found){
        console.log("Invalid Credentials");
    }
}

function searchForUser(obj,search){
    var searchResults = [];
    for (var i in obj){
        var username = obj[i]['username']
        if(!(username === undefined) && username.includes(search)){
            searchResults.push(obj[i]);
        }
    }
    return(searchResults);
}

function searchForMovie(obj,search){
    var searchResults = [];
    for (var i in obj){
        var title = obj[i]['Title']
        if(!(title === undefined) && title.includes(search)){
            searchResults.push(obj[i]);
        }
    }
    return searchResults;
}

//Print Movies
function printMovies(obj){
    let movies = [];
    for (var i in obj){
        movies.push((obj[i]['Title']));
    }
    return movies;
}

function printMoviesByGenre(obj,genre){
    let movies = [];
    for (var i in obj){
        let movieArr = obj[i]['Genre'].replace(/\s/g, '');
        movieArr = (movieArr.split(','));
        
        for (var j in movieArr){
            if (movieArr[j] === genre){
                movies.push(obj[i]['Title']);
            }
        }

        
    }
    return movies;
}

function addToFavourite(movieObj,user){
    user.movieList.push(movieObj);
    //console.log(user.movieList);
    //user.movieList.push(JSON.stringify(movieObj));
}

function addToWatchList(movieObj,user){
    user.watchlist.push(movieObj);
    //console.log(user.movieList);
    //user.movieList.push(JSON.stringify(movieObj));
}

function userReview(userObj,movieObj,rating){
    var reviewObj = [movieObj,rating];
    userObj.review.push(reviewObj);

    console.log("Rating: "+movieObj['Title']);
}

function followUser(userA,userB){
    userA.following.push(userB.username);
    userB.followers.push(userA.username);
}

function search(searchTerm, type) {
    if (!type) {
        type = "all";
    }
    document.getElementById("list").innerHTML = "";
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let parser = JSON.parse(xhttp.responseText);
            for (let i = 0; i < parser.length; i++) {
                let listItem = document.createElement("LI");
                let a = document.createElement("A");
                a.href = parser[i].url;
                a.text = parser[i].information
                listItem.appendChild(a)
                document.getElementById("list").appendChild(listItem);
                let breakLine = document.createElement("BR");
                document.getElementById("list").appendChild(breakLine);
            }
         }
         
    }
    xhttp.open("GET", "/search?searchTerm=" + searchTerm + "&type=" + type, true);
    xhttp.send();
}
//Create Test Users
/*
let user1 = userSignUp({username:"TestUser1",password:"TestUser1Password"});
let user2 = userSignUp({username:"TestUser2",password:"TestUser2Password"});
let user3 = userSignUp({username:"TestUser3",password:"TestUser3Password"});
//console.log(users);
//Test Log In
logIn(users,"TestUser1","TestUser1Password"); // - sucessful log in 
logIn(users,"TestUser2","WRONG"); //- Invalid Credentials

//Print all Movies
console.log(printMovies(movies)); //- Returns all titles

console.log(printMoviesByGenre(movies,"Comedy"));


//Add Jumanji to User 1 

addToFavourite(movies[1],user1);

//console.log(user1);

//Add to watchlist
addToWatchList(movies[3],user1);

//Search Users
//Should return user object with username TestUser1
console.log(searchForUser(users,"1"));

//Search Movies
console.log(searchForMovie(movies,"Toy"));


//Add a movie+review to user 
//User 1 rates jumanji an 8/10
userReview(user1,movies[1],8);
//User 2 rates waiting to exhale 5/10
userReview(user2,movies[3],5);



//Follow Users
followUser(user1,user2);
console.log(user1);
console.log(user2);
*/