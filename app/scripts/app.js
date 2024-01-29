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
      throw new Error(error);
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
    } else {
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



