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
    // noteObjects = nnn.filter(note => note.ID != 1718944229724);
    // console.log(noteObjects)


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

            let deleteIcon = document.createElement("span");
            deleteIcon.textContent = " ❌";
            deleteIcon.className = "delete-icon";
            
            newEl.innerHTML = `<a href="${noteObject.url}" target="_blank">Link</a> ${noteObject.note}`
            newEl.appendChild(deleteIcon);

            deleteIcon.addEventListener("click", function() {
                console.log(noteObject.note)
                removeNote(noteObject)
            })
            noteDisplayEl.append(newEl)
            
        }
        
    })
    // // noteDisplayEl.innerHTML = listItem
    // let newEl = document.createElement("li")
    
    // newEl.innerHTML = `<a href="https://www.google.com/" target="_blank">Link</a> Meet`
    
    // newEl.addEventListener("click", function() {
    //     // let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    //     console.log("Yes working")
    //     // remove(exactLocationOfItemInDB)
    // })

    // noteDisplayEl.append(newEl)
}

function removeNote(noteObject) {
    notes = notes.filter(note => note.ID != noteObject.ID);
    renderNotes();
}