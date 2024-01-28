const returnTicketId = function returnTicketId(string) {
    const trimmedUrl = string.split("?")[0];

    const pathSegments = trimmedUrl.split("/");
    console.log(pathSegments);
    const ticketId = pathSegments[pathSegments.length - 1];

    console.log(`ticket-${ticketId}`);
    return `ticket-${ticketId}`;
}

async function showNotifications(message, type) {
    try {
        const client = await app.initialized();
        await client.interface.trigger('showNotify', {
            type: type,
            message: message
        })
    } catch (error) {
        console.log(error);
    }
}

function resetForm() {
    let form = document.querySelector('fw-form');
    let inputs = form.querySelectorAll('fw-input', 'fw-select', 'fw-textarea');

    inputs.forEach(input => {
        switch (input.tagName) {
            case 'fw-input':
            case 'fw-textarea':
                input.value = '';
                break;
            case 'fw-select':
                input.value = input.querySelector('fw-select-option').value;
                break;
        }
    })
}

function showToastForDeleteNote(message, type) {
    const toast = document.getElementById('modalToast');
    toast.content = message;
    toast.type = type;
    toast.trigger();
}

function showToastForCreateNote(message, type) {
    const toast = document.getElementById('createdToaster');
    toast.content = message;
    toast.type = type;
    toast.trigger();
}

async function concatLink(url) {
    const linkSection = document.getElementById('viewLinkSection');
    const para = linkSection.querySelector('p');
  
    const firstHalf = document.createTextNode('Click ');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.innerHTML = "here";
    anchor.target="__blank";
    const thirdHalf = document.createTextNode(' to view the page');
    para.appendChild(firstHalf);
    para.appendChild(anchor);
    para.appendChild(thirdHalf);
  }