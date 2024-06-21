const inputNoteEl = document.getElementById("input-note")
const saveBtnEl = document.getElementById("save-btn")
const noteDisplayEl = document.getElementById("note-display")

saveBtnEl.addEventListener("click", function() {
    let listItem = ""
    let note = inputNoteEl.value
    if (note) {
        listItem = `
            <li> ${note} </li>
        `
    }
    noteDisplayEl.innerHTML += listItem
    inputNoteEl.value = ""
})