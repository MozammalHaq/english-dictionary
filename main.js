const searchedWord = document.getElementById("searched-word");
// const origin = document.getElementById("origin");
const meaning = document.getElementById("meanings");
const synonym = document.getElementById("synonym");
const text = document.getElementById("text");

const dictionary = () => {
    const word = text.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => showMeaning(data))
}

const showMeaning = data => {
    // console.log(data);
    if (data?.title === "No Definitions Found") {
        alert(data?.message)
    }
    searchedWord.innerText = data[0].word;

    meaning.innerText = "";

    const meanings = data[0]?.meanings[0]?.definitions;
    // console.log(meanings);

    meanings.map(mean => {
        // console.log(mean.definition)
        const li = document.createElement('li');
        li.classList.add("text-success");
        li.classList.add("mb-2");
        li.innerText = mean?.definition;
        meaning.appendChild(li);
    })
    // console.log(data[0]?.meanings[0]);
    const synonym = data[0]?.meanings[0].synonyms;
    const audio = data[0]
    showSynonyms(synonym);
    displayAudion(audio);
}

const showSynonyms = data => {
    // console.log(data);
    synonym.innerText = "";
    data.map(syno => {
        const li = document.createElement('li');
        li.innerText = syno;
        synonym.appendChild(li);
    })
}

const displayAudion = data => {
    const parent = document.getElementById("audio");
    console.log(parent);
    data.phonetics.forEach(element => {
        const audio = document.createElement("audio");
        // console.log(element.audio);
        audio.src = element.audio;
        const button = document.createElement("button");
        button.classList.add("btn")
        button.classList.add("btn-primary")
        button.classList.add("me-2")
        button.innerHTML = "Audio";
        button.onclick = () => {
            audio.play();
        };
        const container = document.createElement("span");
        container.appendChild(button);
        container.appendChild(audio);

        parent.appendChild(container)
    })
}