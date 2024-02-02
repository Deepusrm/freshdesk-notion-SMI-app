var client;

init();

let ticketData;
let ticket_id;

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', async () => {
    try {
      ticketData = await client.data.get('ticket');
      ticket_id = ticketData.ticket.id;
      console.log('Ticket id is : ' + ticket_id);
      setupApp();
    } catch (error) {
      console.error(error);
    }
  });
}

async function setupApp() {
  console.log('Ticket id is : ' + ticket_id);
  const form = document.querySelector('fw-form');
  const createButton = document.getElementById('createButton');
  // const editButton = document.getElementById('editButton');
  const deleteButton = document.getElementById('deleteButton');
  // const viewButton = document.getElementById('viewButton');

  form.addEventListener('submit', handleFormSubmit);
  createButton.addEventListener('click', (e) => handleFormSubmit(e));
  // editButton.addEventListener('click', (e) => handleFormSubmit(e));
  deleteButton.addEventListener('click', async () => {
    await client.interface.trigger('showModal', {
      template: './deleteNoteModal.html'
    })
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const noteType = +document.querySelector('#noteType').value;
  const noteTitle = document.querySelector('#noteTitle').value;
  const noteContent = document.querySelector('#noteContent').value;

  let args = { noteType, noteTitle, noteContent };
  createNote(args);

}

async function createNote(args) {
  // Call the corresponding server method invocation function with the necessary parameters for creating a note
  document.getElementById('loader').style.display = "block"
  // const ticketDetails = await client.data.get("ticket");
  // const id = ticketDetails.ticket["id"];
  // console.log(id);
  let ticket = {
    "PageId": "",
    "Notes": {},
    "url": ""
  }
  let params = { ...args, ticket_id, ticket };
  try {
    await client.db.set(`ticket-${ticket_id}`, { ticket }, { setIf: "not_exist" });
    try {
      const result = await client.request.invoke('createNote', { data: params });
      document.getElementById('loader').style.display = "none";
      resetForm();
      if(result.response === "Note created successfully"){
        await showNotifications(result.response, 'success');
      }else{
        await showNotifications(result.response,'danger');
      }
    } catch (error) {
      console.error(error);
    }
    // try {
    // } catch (error) {
    //   console.error(error);
    //   // throw new Error(error);
    // }
  } catch (error) {
    if (error.message === "The setIf conditional request failed") {
      try {
        const result = await client.request.invoke('appendNote', { data: params });
        document.getElementById('loader').style.display = "none";
        resetForm();
        if(result.response === "Note added successfully"){
          await showNotifications(result.response, 'success');
        }else{
          await showNotifications(result.response,'danger');
        }
        
      } catch (error) {
        console.error(error);
      }
    }
  }
}



