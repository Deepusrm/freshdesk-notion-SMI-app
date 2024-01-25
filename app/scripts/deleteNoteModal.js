document.addEventListener('DOMContentLoaded',async ()=>{
    const deleteNoteButton = document.getElementById('delete');
    if(deleteNoteButton){
        deleteNoteButton.addEventListener('click', deleteNote);
    }else{
        console.log("delete button not found");
    }
})



async function deleteNote() {
    // Call the corresponding server method invocation function with the necessary parameters for deleting a note
    console.log("client side delete function entered");
    try {
        const client = await app.initialized();
        const noteId = document.getElementById('noteId').value;
        const ticketDetails = await client.data.get("ticket");
        const id = ticketDetails.ticket["id"];
        const ticketId = `ticket-${id}`;

        let deleteParams = { noteId, ticketId };
        await client.request.invoke('deleteNote', { data: deleteParams });
        console.log("note deleted successfully!");

    } catch (error) {
        console.error(error);
    }
}