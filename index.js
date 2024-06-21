const inputNoteEl = document.getElementById("input-note")
const saveBtnEl = document.getElementById("save-btn")
const noteDisplayEl = document.getElementById("note-display")
let date = new Date();
let notes = []
let noteObject = {
    url: "",
    note: "",
    ID: ""
}

saveBtnEl.addEventListener("click", function() {
    let url = ""
    clearNoteObject()
    if (chrome && chrome.tabs){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            noteObject.url = tabs[0].url
        })
    }
    // noteObject.url = "https://www.google.com/"
    noteObject.note = inputNoteEl.value
    date = new Date()
    noteObject.ID = date.valueOf()
    console.log(notes)
    addNote(noteObject)
})

function addNote(noteObject) {
    notes.push(noteObject)
    clearNoteObject()
    renderNotes()
    inputNoteEl.value = ""
}

function clearNoteObject() {
    noteObject= {
        url: "",
        note: ""
    }
}

function renderNotes() {
    let listItem = ""
    noteDisplayEl.innerHTML = ""
    notes.map((noteObject) => {
        if (noteObject.note) {
            let newEl = document.createElement("li")
            
            let linkEl = document.createElement("span");
            linkEl.className = "li-link";
            linkEl.innerHTML = `<a href="${noteObject.url}" target="_blank">Link</a>`;

            let noteContent = document.createElement("span");
            noteContent.className = "note-content";
            noteContent.innerHTML = `${noteObject.note}`;

            let deleteIcon = document.createElement("span");
            deleteIcon.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>'
            deleteIcon.className = "delete-icon";

            newEl.appendChild(linkEl);
            newEl.appendChild(noteContent);
            newEl.appendChild(deleteIcon);

            deleteIcon.addEventListener("click", function() {
                console.log(noteObject.note)
                removeNote(noteObject)
            })
            noteDisplayEl.append(newEl)
            
        }
        
    })
}

function removeNote(noteObject) {
    notes = notes.filter(note => note.ID != noteObject.ID);
    renderNotes();
}