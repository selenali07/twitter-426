// Axios Request to-do: [index, create, read, update, destroy, like, unlike, reply, retweet]
export async function index(skip) {
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        params: {
            limit: 75,
            skip: skip,
        }
    });
    return result.data;
}
export async function create(tweet) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            body: tweet
        },
    });
    return result;
}
export async function read(id) {
    const result = await axios({
        method: 'get',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    return result;
}
export async function update(tweet, id) {
    const result = await axios({
        method: 'put',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
        data: {
            body: tweet
        },
    });
    return result
}
export async function destroy(id) {
    const result = await axios({
        method: 'delete',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    return result
}
export async function like(id) {
    const result = await axios({
        method: 'put',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}/like`,
        withCredentials: true,
    });
    return result
}
export async function unlike(id) {
    const result = await axios({
        method: 'put',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}/unlike`,
        withCredentials: true,
    });
    return result
}
export async function reply(reply, id) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "reply",
            "parent": id,
            "body": reply,
        },
    });
    return result;
}
export async function retweet(retweet, id) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": id,
            "body": retweet,
        },
    });
    return result;
}
export const renderFeed = function (tweets) {
    let feed = '';
    tweets.forEach((tweet) => {
        //https://stackoverflow.com/questions/1643320/get-month-name-from-date
        let date = new Date(tweet.createdAt);
        let update = new Date(tweet.updatedAt);
        let newHourMin = update.toLocaleString('en-US', {hour: 'numeric',minute: 'numeric',hour12: true})
        let newMonth = update.toLocaleString('default', {month: 'short'});
        let newDateStr = 'Edited: ' + newHourMin + ' · ' + newMonth + ' ' + update.getDate() + ', ' + update.getFullYear();
        let hourMin = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric',hour12: true})
        let month = date.toLocaleString('default', { month: 'short'});
        let dateStr = 'Posted: ' + hourMin + ' · ' + month + ' ' + date.getDate() + ', ' + date.getFullYear();
        let tweetTime = (update.getSeconds() != date.getSeconds() || update.getHours() != date.getHours() || update.getMinutes() != date.getMinutes() || date.getMonth() != update.getMonth() || update.getFullYear() != date.getFullYear()) ? `${newDateStr}` : ``;
        let editButton = tweet.isMine ? `<button class="button is-ghost is-rounded destroy mr-4" id="${tweet.id}">Delete</button> <button class="button is-ghost is-rounded edit" id="${tweet.id}">Edit</button>` : ``;
        let likeButton = tweet.isLiked ? '' : 'is-light';
        let retweetText = tweet.parent ? `RT: @${tweet.parent.author} "${tweet.parent.body}"` : ``;
        let viewRep = tweet.replyCount > 0 ? `<div class="card-footer-item"><button id="${tweet.id}" class="button is-info is-inverted is-rounded viewReply"> View Replies</button></div>` : ``;
        // let viewLikes = tweet.likeCount > 0 ? `<div class="card-footer-item"><button id="${tweet.id}" class="button is-danger is-inverted is-rounded viewLikes"> View Likes</button></div>` : ``;
        let type = `<span class = "icon has-text-info"><i class="fa fa-twitter fa-lg"></i></span>`;
        if (tweet.type == "retweet") {type = `<span class = "icon has-text-grey"><i class="fa fa-retweet fa-lg"></i></span>`;}
        if (tweet.type == "reply") {type = `<span class = "icon has-text-grey"><i class="fa fa-reply fa-lg"></i></span>`};
        feed += `
        <div class="card my-4 mainCard ${tweet.id}">
            <div class="tweet">
                <header class="card-header">
                <h5 id = "author${tweet.id}"class="card-header-title my-4 is-size-5"> <span class = "mr-3">${type} </span> @${tweet.author}</h5>
                <div class="card-header-item m-4 is-pulled-right">${editButton}</div>
                </header>
                <div id="tweetContent${tweet.id}">
                    <div class="card-content text-wrap card-content">
                        <div class="content text-wrap">
                            <p id="content${tweet.id}">${retweetText} ${tweet.body}</p> <br>
                            <time id="createdAt${tweet.id}"class="time has-text-weight-semibold">${dateStr}<br> \r\n ${tweetTime}</time>
                        </div>
                    </div>
                <div class = "card-footer">
                    <div class="card-footer-item">
                        <button id="${tweet.id}" class="button is-info is-light is-rounded reply"><i class="fa fa-reply"> ${ tweet.replyCount }</i></button>
                    </div>         
                    <div class="card-footer-item">
                        <button id="${tweet.id}" class="button is-primary is-light is-rounded retweet"><i class="fa fa-retweet"> ${tweet.retweetCount}</i></button>
                    </div>
                    <div class="card-footer-item">
                        <button id="like${tweet.id}" class="button is-danger is-rounded like ${likeButton}"><i id="likeCount${ tweet.id }" class="fa fa-heart"> ${tweet.likeCount}</i></button>
                    </div>     
                </div>
                <div class = "card-footer">${viewRep} <div class="card-footer-item"><button id="${tweet.id}" class="button is-danger is-inverted is-rounded viewLikes"> View Likes</button></div></div>
            </div> <br>
            <div class = "mx-5 is-centered">
            <div id="reply${tweet.id}"></div>
            </div></div>
        </div>`
    });
    return feed;
}
//https://stackoverflow.com/questions/10072216/jquery-infinite-scroll-with-div-not-scrollbar-of-body?noredirect=1&lq=1
export const loadTweets = function(tweetIdx){
    for (let i = 0; i < ((tweetIdx / 75) << 0); i++) {
        index(i * 75) // each incremnt adds 75 tweets to dom
        .then(function (tweets) { 
            i == 0 ? $('#feed').html(renderFeed([...tweets])) : $('#feed').append(renderFeed([...tweets]));
        }); 
    }
}
$(document).ready(function () {
    let tweetIdx = 75; // starts with 75 tweets which is max amount
    let len;
    loadTweets(tweetIdx);
    $(window).scroll(function () { // calls on load tweets when scroll detects bottom of screen
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            index(tweetIdx).then(function (tweets) {
                $('#feed').append(renderFeed([...tweets]));
                tweetIdx+=75;
            });
        }
    });
    $('#homepage').on('click', '#tweetButton', function (event) {
        event.preventDefault(); // changed it to an id instead of class and fixed 
        const tweetBody = document.getElementById('tweetBox').value;
        create(tweetBody)
            .then(() => {
                loadTweets(tweetIdx);
                $('#tweetBox').val('');
                $('#count').html('280') //reset char count of span tracker
            })
    });
    $('#homepage').on('click', '.cancel', function (event) {
        event.preventDefault();
        loadTweets(tweetIdx);
    });
    $('#homepage').on('click', '.edit', function (event) {
        event.preventDefault();
        let id = event.currentTarget.id;
        read(id)
            .then((tweet) => {
                $(`#tweetContent${id}`).replaceWith(`
            <div class="m-4"> <textarea maxlength="280" placeholder="e.g. Hello world" class="textarea" id="editBox${id}">${tweet.data.body}</textarea></div>
            <div class="m-4 is-pulled-right">
                <button id="cancel${id}" class="button cancel">Cancel</button>
                <button id="post${id}" class="button is-info postEdit">Submit</button>
            </div>`);
            })
    });
    $('#homepage').on('click', '.postEdit', function (event) {
        event.preventDefault();
        const idNum = event.currentTarget.id.replace(/\D/g, "");
        const tweetBody = document.getElementById(`editBox${idNum}`).value;
        len = tweetBody.length - 280;
        update(tweetBody, idNum).then(() => {
            loadTweets(tweetIdx)
        }).catch(err => {
            alert("tweet is " + `${len}` + " characters too long");
        })
    });
    $('#homepage').on('click', '.destroy', function (event) {
        event.preventDefault();
        destroy(event.currentTarget.id).then(() => {loadTweets(tweetIdx)})
    });
    $('#homepage').on('click', '.like', function (event) {
        event.preventDefault();
        // regex to access id num from id name 
        // id accesses the button idNum access likecount within button val
        // https://stackoverflow.com/questions/30607419/return-only-numbers-from-string
        let id = event.currentTarget.id;
        const idNum = id.replace(/\D/g, "");
        if (event.currentTarget.classList.contains('is-light')) {
            like(idNum)
                .then(() => {
                    document.getElementById(id).classList.remove('is-light'); // filled red for like
                    document.getElementById(`likeCount${idNum}`).firstChild.nodeValue++;
                }).catch(err => {
                    //bc aparantly youre not allowed to even though real twitter you can
                    //removing the button makes it look unbalanced to im just gonna leave it and make an alert whoops
                    alert("sorry, you're not allowed to like your own tweet")}); 
        } else {
            unlike(idNum)
                .then(() => {
                    document.getElementById(id).classList.add('is-light'); // light for unlike
                    document.getElementById(`likeCount${idNum}`).firstChild.nodeValue--;
                }).catch(err => {});
        }
    });
    $('#homepage').on('click', '.viewLikes', function (event) {
        event.preventDefault();
        let id = event.currentTarget.id;
        read(id)
            .then((tweet) => {
                let likeList = ``;
                if (tweet.data.likeCount > 0 && tweet.data.likeCount < 4) {
                    tweet.data.someLikes.forEach(l => {likeList += `<li class = "is-size-5">@${l}</li>`})
                } else if (tweet.data.likeCount > 3) {
                    tweet.data.someLikes.forEach(l => {likeList += `<li class = "is-size-5">@${l}</li>`})
                    likeList += `<li class = "is-size-5">and others but youll never know who...</li>`;
                } else {likeList = `<div class="is-size-5 has-text-centered">no likes yet loserrrr</div>`;}
                $(`body`).append(`    
                <div class="modal is-active">
                    <div class ="modal-background"></div>
                    <div id ="rtModal" class="modal-card has-background-white">
                        <header class = "modal-card-head has-background-white ">
                            <p class="modal-card-title has-text-centered">Liked by</p>
                            <button id = "modaltext" class="modal-close is-large" aria-label="close"></button>
                        </header>
                        <div class="modal-card-body">
                            <div class="card-content text-wrap">${likeList}</div>
                        </div>
                    </div>   
                </div>`);
                $('.modal-close').click(function () {$('.modal').removeClass('is-active');});
                $('.modal-background').click(function () {$('.modal').removeClass('is-active');});
            })
    });
    $('#homepage').on('click', '.retweet', function (event) {
        event.preventDefault();
        let id = event.currentTarget.id;
        const op = $(`#author${id}`).html();
        const opPost = $(`#content${id}`).text();
        const opTime = $(`#createdAt${id}`).html();
        $(`body`).append(`    
        <div class="modal is-active">
            <div class ="modal-background"></div>
            <div id ="rtModal" class="modal-card has-background-white">
                <header class = "modal-card-head has-background-white">
                    <p class="modal-card-title">Retweet</p>
                    <button id = "modaltext" class="modal-close is-large" aria-label="close"></button>
                </header>
                <body class="modal-card-body">
                    <textarea maxlength="280" placeholder="Add a comment" class="textarea" id="retweeteditor${id}"></textarea>   
                    <div class="card-content text-wrap">
                        <p id="content${id}">${op} - RT: "${opPost}"</p>
                        <time class ="has-text-weight-semibold">${opTime}</time>
                    </div>
                </body>
                <footer class="modal-card-foot has-background-white is-justify-content-flex-end mr-3">
                    <button id="postRT${id}" class="button is-info postRT">Retweet</button>
                </footer>
            </div>   
        </div>`);
        $('.modal-close').click(function () {$('.modal').removeClass('is-active');});
        $('.postRT').click(function () {$('.modal').removeClass('is-active');});
        $('.modal-background').click(function () {$('.modal').removeClass('is-active');})
    });
    $('#homepage').on('click', '.postRT', function (event) {
        event.preventDefault();
        const idNum = event.currentTarget.id.replace(/\D/g, "");
        const retweetBody = $(`#retweeteditor${idNum}`).val();
        len = retweetBody.length-280;
        let body = ' ';
        if (retweetBody) { body = retweetBody; }
        retweet(body, idNum).then(() => {
            loadTweets(tweetIdx)
        }).catch(err => {alert("Retweet comment is " + `${len}` + " characters too long");})

    });
    $('#homepage').on('click', '.reply', function (event) {
        event.preventDefault();
        let id = event.currentTarget.id;
        read(id)
            .then(() => {
                $(`#reply${id}`).html(`      
            <div class = "column is-10 is-offset-1">
                <h2 class = "mb-2">Write a reply</h2>
                <textarea maxlength="280" placeholder="Tweet your reply" class="textarea is-info" id="replyText${id}"></textarea> <br>
                    <span class = "is-pulled-right mb-4">
                    <button id="cancel${id}" class="button cancel">Cancel</button>
                    <button id="postReply${id}" class="button is-info postReply">Reply</button>
                    </span>
                </div>
            </div>`);
            })
    });
    $('#homepage').on('click', '.postReply', function (event) {
        event.preventDefault();
        const idNum = event.currentTarget.id.replace(/\D/g, "");
        const retweetBody = document.getElementById(`replyText${idNum}`).value;
        len = retweetBody.length-280;
        $(`#replyText${idNum}`).val(''); //clear val so doesnt spam tweet with mult clicks :o 
        reply(retweetBody, idNum).then(() => {
            loadTweets(tweetIdx)
        }).catch(err => {alert("Retweet comment is " + `${len}` + " characters too long");})
    });
    $('#homepage').on('click', '.viewReply', function (event) {
        event.preventDefault();
        let id = event.currentTarget.id;
        read(id)
            .then((tweet) => {
                if (tweet.data.replies != 0) {
                    let replies = `<div class = "my-4"> <h1 class = "subtitle mx-4 has-text-centered">Replies</h1></div>`
                    replies += renderFeed(tweet.data.replies)
                    $(`#reply${id}`).html(`${replies}
                    <div class="m-4"><button id="cancel${id}" class="button is-danger cancel is-pulled-right mb-4">Close</button></div>`);
                }
            })
    });
});
