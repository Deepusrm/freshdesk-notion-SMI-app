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
    document.getElementById('deleteModalLoader').style.display = "block";
    try {
        const client = await app.initialized();
        const ticket = await client.data.get("ticket");
        const noteId = document.getElementById('noteId').value;
        try {
            await client.request.invoke('deleteNote', { ticket_id: `${ticket.ticket.id}`, note_id: noteId });  
            document.getElementById('deleteModalLoader').style.display = "none";
            showToastForDeleteNote('Note deleted successfully',"success");
            console.log("Note deleted successfully");  
        } catch (error) {
            console.error(error);
        }
    }catch(error){
        if(error.message === 'Timeout error while processing the request.'){
            try {
                document.getElementById('deleteModalLoader').style.display = "none";
                // await showNotifications('Note deleted successfully','success');
                showToastForDeleteNote('Note deleted successfully',"success");
                console.log('Note deleted successfully');
            } catch (error) {
                console.error(error);
            }
            console.log('Note deleted successfully');
        }else{
            showToastForDeleteNote('Proccess failed',"error");
            console.log('Process failed');
            // await showNotifications(error.message,'danger');
        }
    }
}