// app.js

// DOM Elements
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const noteTag = document.getElementById('noteTag');
const notesList = document.getElementById('notesList');
const darkModeToggle = document.getElementById('darkModeToggle');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = null;

// Add a new note
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = noteTitle.value;
    const content = noteContent.value;
    const tag = noteTag.value;

    if (editIndex !== null) {
        notes[editIndex] = { title, content, tag };
        editIndex = null;
    } else {
        notes.push({ title, content, tag });
    }

    noteForm.reset();
    saveNotes();
    renderNotes();
});

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Render notes
function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="tags">Tags: ${note.tag ? note.tag : 'No tags'}</div>
            <div class="actions">
                <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        notesList.appendChild(noteDiv);
    });
}

// Edit a note
window.editNote = function(index) {
    const note = notes[index];
    noteTitle.value = note.title;
    noteContent.value = note.content;
    noteTag.value = note.tag;
    editIndex = index;
}

// Delete a note
window.deleteNote = function(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

// Load saved notes on page load
window.addEventListener('load', renderNotes);

// Toggle Dark Mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
