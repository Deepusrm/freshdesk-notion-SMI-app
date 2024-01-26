document.addEventListener('DOMContentLoaded', () => {
    console.log("dom content loaded");
    let deleteNoteButton = document.getElementById('deleteNote');
    if (deleteNoteButton) {
        console.log(deleteNoteButton);
        deleteNoteButton.addEventListener('click', deleteNote);
    } else {
        console.log("delete button not found");
    }
});

async function deleteNote() {
    console.log("delete function entered");
    const client = await app.initialized();
    const ticket = await client.data.get("ticket");
    console.log(ticket.ticket.id);
    const noteId = document.getElementById('noteId').value;
    console.log(noteId);

    await client.request.invoke('deleteNote',{ticket_id:`${ticket.ticket.id}`,note_id:noteId});
    console.log("Note deleted successfully");

}