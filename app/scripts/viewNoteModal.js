document.addEventListener('DOMContentLoaded', async () => {
    console.log("dom content loaded");
    await viewAllNotes();
})
async function viewAllNotes() {
    try {
        const client = await app.initialized();
        const ticket = await client.data.get('ticket');

        const noteContainer = document.querySelector('#noteContainer');
        const ticketId = `ticket-${ticket.ticket.id}`;
        const heading1 = document.getElementById('ticketIdHeading');
        heading1.innerHTML = ticketId;
        const content = await client.request.invoke('getAllNotes', { ticket_id: ticketId });

        let paragraph;
        let heading;
        let list;
        let horizontal_line;
        content.forEach(element => {
            if (element.type === "paragraph") {
                paragraph = document.createElement("p");
                paragraph.innerHTML = element["paragraph"]["rich_text"][0]["text"]["content"];

                noteContainer.append(paragraph);
            } else if (element.type === "heading_3") {
                heading = document.createElement("div");
                heading.className = "fw-type-h3";
                heading.innerHTML = element["heading_3"]["rich_text"][0]["text"]["content"];

                noteContainer.append(paragraph);
            } else if (element.type === "to_do" || element.type === "numbered_list_item") {
                list = document.createElement("li");
                list.className = "notes";
                list.innerHTML = element[element.type]["rich_text"][0]["text"]["content"];

                noteContainer.append(list);
            } else if (element.type === "divider") {
                horizontal_line = document.createElement("hr");

                noteContainer.append(horizontal_line);
            }
        });
    }catch(error){
        if(error.message === 'Timeout error while processing the request.'){
            await showNotifications('Failed to load the notes','danger');
        }
    }
    
}