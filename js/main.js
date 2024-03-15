const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

const observer = new IntersectionObserver(callback, options);

function callback (entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            newPosts();
        }
    });
}

const posts = document.getElementsByClassName('post');

function newPosts(){
    fetch('json/data.json')
        .then((res) => res.json())
        .then ((data) => {
            makePost(data);
            const lastPost = posts[posts.length - 1];
            if (lastPost) {
                observer.observe(lastPost);
            }
        })
}

function makePost(data){
    for (let i = 0; i < 15; i++){

        let main = document.querySelector("main");
            
        let post = document.createElement("article");
        post.classList.add("post");

        let userSection = document.createElement("section");
        userSection.classList.add("userSection");
        
        let username = document.createElement("h4");
        username.classList.add("username");
        username.innerHTML = (data[i].username);
        
        let name = document.createElement("h5");
        name.classList.add("name");
        name.innerHTML = ("@" + data[i].name);

        let day = document.createElement("p");
        day.classList.add("day");
        day.innerHTML = (data[i].day);
        
        let content = document.createElement("p");
        content.classList.add("content");
        
        let postInteraction = document.createElement("section");
        postInteraction.classList.add("postInteraction");

        let comment = document.createElement("i");
        comment.classList.add("fa-regular", "fa-comment");

        let repost = document.createElement("i");
        repost.classList.add("fa-solid", "fa-repeat");
        
        let heart = document.createElement("i");
        heart.classList.add("fa-regular", "fa-heart");

        userSection.append(username, name, day);
        post.append(userSection, content, postInteraction);
        main.append(post);

        postInteraction.append(comment, repost, heart,)
        content.innerHTML = (data[i].content);
    }
};

newPosts();