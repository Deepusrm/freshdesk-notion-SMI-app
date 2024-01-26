var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', setupApp);
}

async function setupApp() {
  const form = document.querySelector('fw-form');
  const createButton = document.getElementById('createButton');
  const editButton = document.getElementById('editButton');
  const deleteButton = document.getElementById('deleteButton');
  const viewButton = document.getElementById('viewButton');

  form.addEventListener('submit', handleFormSubmit);
  createButton.addEventListener('click', (e) => handleFormSubmit(e));
  editButton.addEventListener('click', (e) => handleFormSubmit(e));
  // deleteButton.addEventListener('click', (e) => handleFormSubmit(e));
  deleteButton.addEventListener('click', () => {
    console.log("delete button pressed");
    client.interface.trigger('showModal', {
      template: './deleteNoteModal.html'
    })
  });
  
  viewButton.addEventListener('click',()=>{
    console.log("view button pressed");
    client.interface.trigger('showModal',{
      template:'./viewNoteModal.html'
    })
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
  const ticketDetails = await client.data.get("ticket");
  const id = ticketDetails.ticket["id"];
  console.log(id);
  let ticket = {
    "PageId": "",
    "Notes": {}
  }
  let params = { ...args, id, ticket };
  try {
    await client.db.set(`ticket-${id}`, { ticket }, { setIf: "not_exist" });
    await client.request.invoke('createNote', { data: params });
    document.querySelector('fw-form').reset();
    console.log("Note created successfully!");
  } catch (error) {
    console.error(error);
    if (error.message === "The setIf conditional request failed") {
      await client.request.invoke('appendNote', { data: params });
      console.log("Note added successfully!");
    } else {
      console.error(error);
    }
  }
}

function updateNote(args) {
  // Call the corresponding server method invocation function with the necessary parameters for updating a note
  try {
    console.log("updated args :" + args);
    console.log("updated title : " + args.noteTitle);
    console.log('updated content : ' + args.noteContent);
    client.request.invoke('updateNote', {});
  } catch (error) {
    console.error();
  }
}

