
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
  createButton.addEventListener('click', (e) =>handleFormSubmit(e));
  updateButton.addEventListener('click', (e) =>handleFormSubmit(e));
  deleteButton.addEventListener('click', (e) =>handleFormSubmit(e));
  // viewButton.addEventListener('click',retrieveNote);
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const noteTitleField = document.querySelector('#noteTitle');
  const noteContentField = document.querySelector('#noteContent');

  const noteTitle = noteTitleField.value;
  const noteContent = noteContentField.value;

  let args = {noteTitle,noteContent};
  if(event.target.id === 'createButton'){
    createNote(args);
  }else if(event.target.id === 'updateButton'){
    updateNote(args);
  }else if(event.target.id === 'deleteButton'){
    deleteNote(args);
  }

}


function createNote(args) {
  // Call the corresponding server method invocation function with the necessary parameters for creating a note
  try{
    console.log("args :"+args);
    console.log("title : "+args.noteTitle);
    console.log('content : '+args.noteContent);
    client.request.invoke('createNote',{});
  }catch(error){
    console.error();
  }
}

function updateNote(args) {
  // Call the corresponding server method invocation function with the necessary parameters for updating a note
  try{
    console.log("updated args :"+args);
    console.log("updated title : "+args.noteTitle);
    console.log('updated content : '+args.noteContent);
    client.request.invoke('updateNote',{});
  }catch(error){
    console.error();
  }
}

function deleteNote(args) {
  // Call the corresponding server method invocation function with the necessary parameters for deleting a note
  try{
    console.log("deleted args :"+args);
    console.log("deleted title : "+args.noteTitle);
    console.log('deleted content : '+args.noteContent);
    client.request.invoke('deleteNote',{});
  }catch(error){
    console.error();
  }
}
