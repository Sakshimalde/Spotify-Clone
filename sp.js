function card(image, title, para) {
    let html = `<div class="card">
    <div class="play">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="black"viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div class="img"> <img aria-hidden="false" draggable="false" loading="lazy" src= ${image} data-testid="card-image" alt="" class="mMx2LUixlnN_Fu45JpFB yMQTWVwLJ5bV8VGiaqU3 Yn2Ei5QZn19gria6LjZj"></div>
                    <div class="words">
                    <h3> ${title} </h3>
                    <p>&nbsp;</p>
                    <p> ${para} </p>
                    </div>
                </div>`
    document.querySelector(".container2").innerHTML = document.querySelector(".container2").innerHTML + html
}

card("https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16", "Sad vibes", "jhgffssgjjdcgjcewhjvvhewvwghfjhewvfgewvfewvfghwvfhvfgv")
card("https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16", "Sad vibes", "jhgffssgjjdcgjcewhjvvhewvwghfjhewvfgewvfewvfghwvfhvfgv")
card("https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16", "Sad vibes", "jhgffssgjjdcgjcewhjvvhewvwghfjhewvfgewvfewvfghwvfhvfgv")
card("https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16", "Sad vibes", "jhgffssgjjdcgjcewhjvvhewvwghfjhewvfgewvfewvfghwvfhvfgv")
card("https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16", "Sad vibes", "jhgffssgjjdcgjcewhjvvhewvwghfjhewvfgewvfewvfghwvfhvfgv")
card("https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16", "Sad vibes", "jhgffssgjjdcgjcewhjvvhewvwghfjhewvfgewvfewvfghwvfhvfgv")
card("https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16", "Sad vibes", "jhgffssgjjdcgjcewhjvvhewvwghfjhewvfgewvfewvfghwvfhvfgv")
card("https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16", "Sad vibes", "jhgffssgjjdcgjcewhjvvhewvwghfjhewvfgewvfewvfghwvfhvfgv")


let play = document.getElementById("p")
let pause = document.getElementById("paus")
let createplaylist = document.getElementById("button")
let section1 = document.querySelector(".section1")
let section2 = document.querySelector(".section2")
let songlist = document.querySelector(".songlist")
let currentsongs = new Audio();
let duration = document.querySelector(".duration")
let songinfo = document.querySelector(".songinfo")
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")
let volume=document.getElementById("volume")

async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/song/")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    console.log(as)
    let songs = [];
    var songs1 = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs1.push(element.href)
        }
    }
    return songs1
}

async function main() {
    let songs1 = await getsongs();
    let songs = []
    for (const song of songs1) {
        songs.push(song.split("/song/")[1])
    }
    console.log(songs)

    //adding songs to playlist
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li><img src="music.svg" alt="" class="invert">
                        <div class="info">
                            <div>${song}</div>
                            <div>artist</div>
                        </div>
                        <div class="playnow">
                            <span>play now</span>
                            <img src="mi.svg" alt="" class="invert">
                        </div></li>`;
    }

    const playmusic = (track) => {

        currentsongs.src = "/song/" + track;
        currentsongs.play();
        play.src = "pause.svg"
    }
    const pausemusic = (track) => {
        currentsongs.src = "/songs" + track;
        currentsongs.pause();
    }

    //displaying playlist
    songlist.classList.add("hide")
    createplaylist.addEventListener("click", () => {
        section1.classList.add("hide")
        section2.classList.add("hide")
        songlist.classList.remove("hide")

    })

    //adding event listener to each songs
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML)
            songinfo.innerHTML = `${e.querySelector(".info").firstElementChild.innerHTML}`;
            duration.innerHTML = `${secondsToMinutesSeconds(currentsongs.currentTime)}/${secondsToMinutesSeconds(currentsongs.duration)}`;
        })
    })

    play.addEventListener("click", () => {
        if (currentsongs.paused) {
            currentsongs.play();
            play.src = "pause.svg"
            songinfo.innerHTML = `${songinfo.innerHTML}`;
            duration.innerHTML = `${secondsToMinutesSeconds(currentsongs.currentTime)}/ ${secondsToMinutesSeconds(currentsongs.duration)}`;
        }
        else {
            currentsongs.pause();
            play.src = "mi.svg"
        }
    })

    //timeupdate
    currentsongs.addEventListener("timeupdate", () => {
        duration.innerHTML = `${secondsToMinutesSeconds(currentsongs.currentTime)}/ ${secondsToMinutesSeconds(currentsongs.duration)}`;
        document.querySelector(".circle").style.left = (currentsongs.currentTime / currentsongs.duration) * 100 + "%"
    })

    //add event listener to seekbar

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentsongs.currentTime = (currentsongs.duration * percent) / 100
    })

    //add event listener to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //add event listener to cross
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    })

    //add eventlistener to prev and next
prev.addEventListener("click", ()=>
{

    let index= songs.indexOf(currentsongs.src.split("/").slice(-1)[0])
    if(index>0)
        {
            songinfo.innerHTML=`${songs[index-1]}`
            console.log(index-1,songs.length)
            playmusic(songs[index-1])
        }
        else{
            pausemusic(songs[index])
            songinfo.innerHTML=`${songs[index]}`
            play.src="mi.svg"

        }
})

next.addEventListener("click",()=>
{
    let index= songs.indexOf(currentsongs.src.split("/").slice(-1)[0])
    if(index<(songs.length)-1)
        {
            songinfo.innerHTML=`${songs[index+1]}`
            console.log(index+1,songs.length)
            playmusic(songs[index+1])
        }
        else{
            pausemusic(songs[index])
            songinfo.innerHTML=`${songs[index]}`
            play.src="mi.svg"

        }

})

//add event listener to volume
document.querySelector(".vol").getElementsByTagName("input")[0].addEventListener("change",(e)=>
{
    currentsongs.volume=parseInt(e.target.value)/100
    console.log(parseInt(e.target.value)/100)
    if((parseInt(e.target.value)/100)==0)
        {
            volume.src="mute.svg"
        }
        else{
            volume.src="volume.svg"
        }
})



}
main();
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}