document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const newNoteButton = document.getElementById('new-note-button');
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');
    const closeModal = document.querySelector('.close');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let currentNoteIndex = null;

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteItem = document.createElement('li');
            noteItem.innerHTML = `
                ${note.title}
                <span class="delete-icon" data-index="${index}">&times;</span>
            `;
            noteItem.addEventListener('click', () => {
                currentNoteIndex = index;
                loadNote();
            });
            notesList.appendChild(noteItem);
        });
    }

    function loadNote() {
        if (currentNoteIndex !== null) {
            noteTitle.value = notes[currentNoteIndex].title;
            noteContent.value = notes[currentNoteIndex].content;
        } else {
            noteTitle.value = '';
            noteContent.value = '';
        }
    }

    noteTitle.addEventListener('input', () => {
        if (currentNoteIndex !== null) {
            notes[currentNoteIndex].title = noteTitle.value;
            saveNotes();
            renderNotes();
            loadNote();
        }
    });

    noteContent.addEventListener('input', () => {
        if (currentNoteIndex !== null) {
            notes[currentNoteIndex].content = noteContent.value;
            saveNotes();
        }
    });

    newNoteButton.addEventListener('click', () => {
        const newNote = {
            title: 'New Note',
            content: ''
        };
        notes.push(newNote);
        currentNoteIndex = notes.length - 1;
        saveNotes();
        renderNotes();
        loadNote();
    });

    notesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-icon')) {
            event.stopPropagation();
            const noteIndex = event.target.getAttribute('data-index');
            deleteModal.style.display = 'block';
            confirmDeleteButton.onclick = () => {
                notes.splice(noteIndex, 1);
                saveNotes();
                renderNotes();
                loadNote();
                deleteModal.style.display = 'none';
            };
            cancelDeleteButton.onclick = () => {
                deleteModal.style.display = 'none';
            };
            closeModal.onclick = () => {
                deleteModal.style.display = 'none';
            };
        }
    });

    renderNotes();
    loadNote();
});
 