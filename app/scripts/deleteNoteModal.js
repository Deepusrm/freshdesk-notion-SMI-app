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
    try {
        const client = await app.initialized();
        const ticket = await client.data.get("ticket");
        const noteId = document.getElementById('noteId').value;
        await client.request.invoke('deleteNote', { ticket_id: `${ticket.ticket.id}`, note_id: noteId });
        await showNotifications('Note deleted successfully', 'success');
        console.log("Note deleted successfully");
    }catch(error){
        if(error.message === 'Timeout error while processing the request.'){
            await showNotifications('Note deleted successfully','success');
        }else{
            await showNotifications(error.message,'danger');
        }
    }
}