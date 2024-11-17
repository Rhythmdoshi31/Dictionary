const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector("#result");
const button = document.querySelector("#button");

button.addEventListener("click", function(){
    let input = document.querySelector("#search-bar").value;
    fetch(`${url}${input}`)
    .then(raw => raw.json())
    .then(data => {
        console.log(data);
        result.innerHTML = 
        `<div id="word">
                <h3>${input}</h3>
                <button id="sound">
                    <i class="ri-volume-up-fill"></i>
                </button>
            </div>
            <div id="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p id="meaning">${data[0].meanings[0].definitions[0].definition}</p>
        </div>`;
        let sound = document.querySelector("#sound");
        sound.addEventListener("click", function () {
        let audioSrc = `${data[0].phonetics[0]?.audio || data[0].phonetics[1]?.audio || ""}`;
        if (audioSrc) {
            let audio = new Audio(audioSrc);
            audio.play();
        } else {
            alert("Audio not available for this word.");
        }
        });
    });
});