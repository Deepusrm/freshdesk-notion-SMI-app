
var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', setupApp);
}

async function setupApp() {
  const form = document.querySelector('fw-form');
  const createButton = document.querySelector('fw-button[color="primary"]');
  const updateButton = document.querySelector('fw-button[color="secondary"]');
  const deleteButton = document.querySelector('fw-button[color="danger"]');

  form.addEventListener('submit', handleFormSubmit);
  createButton.addEventListener('click', createNote);
  updateButton.addEventListener('click', updateNote);
  deleteButton.addEventListener('click', deleteNote);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const noteTitle = document.querySelector('fw-input[label="Note Title"]').value;
  const noteContent = document.querySelector('fw-input[label="Note Content"]').value;

  console.log(noteContent+" "+noteTitle);
  // Call the appropriate server method invocation function based on the operation selected by the user
}

function createNote() {
  // Call the corresponding server method invocation function with the necessary parameters for creating a note
}

function updateNote() {
  // Call the corresponding server method invocation function with the necessary parameters for updating a note
}

function deleteNote() {
  // Call the corresponding server method invocation function with the necessary parameters for deleting a note
}
