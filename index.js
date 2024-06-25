const inputNoteEl = document.getElementById("input-note")
const saveBtnEl = document.getElementById("save-btn")
const deleteAllBtnEl = document.getElementById("delete-all-btn")
const noteDisplayEl = document.getElementById("note-display")
const notesFromLocalStorage = JSON.parse( localStorage.getItem("myJobNotes") )
let date = new Date();
let notes = []
let noteObject = {
    url: "",
    note: "",
    ID: ""
}

if (notesFromLocalStorage) {
    notes = notesFromLocalStorage
    console.log(notes)
    renderNotes()
}

saveBtnEl.addEventListener("click", function() {
    let url = ""
    clearNoteObject()

    function addNoteAfterTabQuery(tab) {
        noteObject.url = tab.url;
        noteObject.note = inputNoteEl.value;
        date = new Date();
        noteObject.ID = date.valueOf();

        console.log(notes);
        console.log(noteObject);
        addNote(noteObject);
    }

    if (chrome && chrome.tabs){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            let tab = tabs[0]
            addNoteAfterTabQuery(tab);
        })
    }
})

deleteAllBtnEl.addEventListener("click", function() {
    clearNoteObject()
    clearNotes()
    localStorage.setItem("myJobNotes", JSON.stringify(notes))
    renderNotes()
})

function addNote(noteObject) {
    notes.unshift(noteObject)
    localStorage.setItem("myJobNotes", JSON.stringify(notes))
    clearNoteObject()
    renderNotes()
    inputNoteEl.value = ""
}

function clearNoteObject() {
    noteObject= {}
}

function clearNotes() {
    notes = []
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
    localStorage.setItem("myJobNotes", JSON.stringify(notes));
    renderNotes();
}