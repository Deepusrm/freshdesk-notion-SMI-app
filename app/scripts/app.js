var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', setupApp);
}

async function setupApp() {
  const form = document.querySelector('fw-form');
  const createButton = document.getElementById('createButton');
  // const editButton = document.getElementById('editButton');
  const deleteButton = document.getElementById('deleteButton');
  const viewButton = document.getElementById('viewButton');

  form.addEventListener('submit', handleFormSubmit);
  createButton.addEventListener('click', (e) => handleFormSubmit(e));
  // editButton.addEventListener('click', (e) => handleFormSubmit(e));
  deleteButton.addEventListener('click', () => {
    console.log("delete button pressed");
    client.interface.trigger('showModal', {
      template: './deleteNoteModal.html'
    })
  });

  viewButton.addEventListener('click', async () => {
    console.log("view button pressed");
    await viewlink();
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log('Function entered');
  const noteTypeField = document.querySelector('#noteType');
  const noteTitleField = document.querySelector('#noteTitle');
  const noteContentField = document.querySelector('#noteContent');

  const noteType = +noteTypeField.value;
  console.log(noteType);
  const noteTitle = noteTitleField.value;
  const noteContent = noteContentField.value;
  console.log(noteContent);


  let args = { noteType, noteTitle, noteContent };
  if (event.target.id === 'createButton') {
    createNote(args);

  } else if (event.target.id === 'editButton') {
    updateNote(args);
  }

}

async function createNote(args) {
  // Call the corresponding server method invocation function with the necessary parameters for creating a note
  document.getElementById('loader').style.display = "block"
  const ticketDetails = await client.data.get("ticket");
  const id = ticketDetails.ticket["id"];
  console.log(id);
  let ticket = {
    "PageId": "",
    "Notes": {},
    "url": ""
  }
  let params = { ...args, id, ticket };
  try {
    await client.db.set(`ticket-${id}`, { ticket }, { setIf: "not_exist" });
    try {
      await client.request.invoke('createNote', { data: params });
    } catch (error) {
      console.error(error);
    }
    try {
      document.getElementById('loader').style.display = "none"
      resetForm();
      await showNotifications('Note created successfully', 'success');
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    if (error.message === "The setIf conditional request failed") {
      try {
        await client.request.invoke('appendNote', { data: params });
        console.log('Note added successfully');
      } catch (error) {
        console.error(error);
      }

      try {
        document.getElementById('loader').style.display = "none";
        resetForm();
        await showNotifications('Note added successfully', 'success');
        console.log('Notifications shown - 1');
      } catch (error) {
        console.error(error);
      }

    // } else if (error.message === 'Timeout error while processing the request.') {
    //   try {
    //     document.getElementById('loader').style.display = "none";
    //     resetForm();
    //     await showNotifications('Note created successfully', 'success');
    //     console.log('Notifications shown - 2');
    //   } catch (error) {
    //     console.error(error);
    //   }

    // } else {
      try {
        document.getElementById('loader').style.display = "none"
        resetForm();
        await showNotifications(error.message, 'danger');
        console.log('Notifications shown - 3')
      } catch (error) {
        console.error(error);
      }
    }
  }
}

async function viewlink() {
  try {
    document.getElementById('loader').style.display = "block";
    document.querySelector('fw-form').style.display = "none";

    const ticket = await client.data.get('ticket');
    const ticketId = `ticket-${ticket.ticket.id}`;
    const ticketDetails = await client.db.get(ticketId);

    const url = ticketDetails.ticket.url;
    await concatLink(url);

    document.getElementById('loader').style.display = "none";
    document.getElementById('viewLinkSection').style.display = "block";

    document.getElementById('back').addEventListener('click',()=>{
      document.getElementById('viewLinkSection').style.display = "none";
      document.querySelector('fw-form').style.display = "block"
    })
  } catch (error) {
    try{
      document.getElementById('loader').style.display = "none";
      console.error(error);
      await showNotifications(error.message,"danger");
    }catch(error){
      console.error(error);
    }
  }
  
}

