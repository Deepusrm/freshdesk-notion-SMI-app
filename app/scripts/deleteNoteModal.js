let ticketData;
let ticket_id;
document.addEventListener('DOMContentLoaded', async () => {
    client = await app.initialized();
    ticketData = await client.data.get('ticket');
    ticket_id = ticketData.ticket.id;
    console.log('Ticket id is : '+ticket_id);
    console.log("dom content loaded");
    let deleteNoteButton = document.getElementById('deleteNote');
    if (deleteNoteButton) {
        console.log(deleteNoteButton);
        deleteNoteButton.addEventListener('click', deleteNote);
    }
});

async function deleteNote() {
    document.getElementById('deleteModalLoader').style.display = "block";
    try {
        // const ticket = await client.data.get("ticket");
        const noteId = document.getElementById('noteId').value;
        try {
            const response = await client.request.invoke('deleteNote', { ticket_id: ticket_id, note_id: noteId });   
            document.getElementById('deleteModalLoader').style.display = "none";
            console.log("Note deleted successfully");
            if(response.response === 'Note deleted successfully'){
                showToastForDeleteNote(response.response,'success');
            }else{
                showToastForDeleteNote(response.response,'error');
            }
        } catch (error) {
            console.error(error);
        }
    }catch(error){
        await showToastForDeleteNote(error.message,'danger');
    }
}