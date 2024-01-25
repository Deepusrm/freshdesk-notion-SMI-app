var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', setupApp);
}

async function setupApp() {
  const form = document.querySelector('fw-form');
  const createButton = document.getElementById('createButton');
  const updateButton = document.getElementById('updateButton');
  const deleteButton = document.getElementById('deleteButton');
  // const viewButton = document.getElementById('viewButton');

  form.addEventListener('submit', handleFormSubmit);
  createButton.addEventListener('click', (e) => handleFormSubmit(e));
  updateButton.addEventListener('click', (e) => handleFormSubmit(e));
  deleteButton.addEventListener('click', (e) => handleFormSubmit(e));
  // viewButton.addEventListener('click',retrieveNote);
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
  } else if (event.target.id === 'updateButton') {
    updateNote(args);
  } else if (event.target.id === 'deleteButton') {
    deleteNote(args);
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
    console.log("Note created successfully!");
  } catch (error) {
    console.error(error);
    if (error.message === "The setIf conditional request failed") {
      await client.request.invoke('appendNote', { data: params });
      console.log("Note added successfully!");
    }else{
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

function deleteNote(args) {
  // Call the corresponding server method invocation function with the necessary parameters for deleting a note
  try {
    console.log("deleted args :" + args);
    console.log("deleted title : " + args.noteTitle);
    console.log('deleted content : ' + args.noteContent);
    client.request.invoke('deleteNote', {});
  } catch (error) {
    console.error();
  }
}
