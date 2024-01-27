const returnTicketId = function returnTicketId(string) {
    const trimmedUrl = string.split("?")[0];

    const pathSegments = trimmedUrl.split("/");
    console.log(pathSegments);
    const ticketId = pathSegments[pathSegments.length - 1];

    console.log(`ticket-${ticketId}`);
    return `ticket-${ticketId}`;
}

async function showNotifications(message,type){
    await client.interface.trigger('showNotify',{
        type:type,
        message:message
    })
}