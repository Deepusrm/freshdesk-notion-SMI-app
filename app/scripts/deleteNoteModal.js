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
            await client.request.invoke('deleteNote', { ticket_id: ticket_id, note_id: noteId });   
            document.getElementById('deleteModalLoader').style.display = "none";
        } catch (error) {
            console.error(error);
            throw error;
        }
    }catch(error){
        if(error.message === 'Timeout error while processing the request.'){
            try {
                document.getElementById('deleteModalLoader').style.display = "none";
                await showToastForDeleteNote(error.message,"error");
                console.log("Error inside the try catch : "+error.message);
            } catch (error) {
                console.error(error);
            }
            console.log("Error outside the try catch : "+error.message);
        }else{
            document.getElementById('deleteModalLoader').style.display = "none";
            // await showNotifications(error.message,'danger');
        }
    }
}