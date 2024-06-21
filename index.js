const inputNoteEl = document.getElementById("input-note")
const saveBtnEl = document.getElementById("save-btn")
const noteDisplayEl = document.getElementById("note-display")
let notes = []
let noteObject = {
    url: "",
    note: ""
}

saveBtnEl.addEventListener("click", function() {
    let url = ""
    clearNoteObject()
    if (chrome && chrome.tabs){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            noteObject.url = tabs[0].url
        })
    }
    noteObject.note = inputNoteEl.value
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
    notes.map((noteObject) => {
        if (noteObject.note) {
            listItem += `
                <li> ${noteObject.note} </li>
            `
        }
        
    })
    noteDisplayEl.innerHTML = listItem
}