const payloadUtils = require('./payload_utilities');
const utils = require('./utilities');
exports = {
  createNote: async function (params) {
    const parentBlock = payloadUtils.parentBlock(params.data.id);
    const [childBlock, noteId] = payloadUtils.childBlock(params.data.noteTitle);
    const body = { ...parentBlock, ...childBlock };

    payloadUtils.appendBlock(body, params);


    const pageId = await utils.returnPageIdOnCreatingNote(body);
    console.log("note created successfully");

    const results = await $request.invokeTemplate("getPageBlocks", {
      context: { page_id: pageId }
    })
    console.log(pageId);
    const blockIds = utils.returnBlockIds(results);

    const ticket = params.data.ticket;
    console.log(ticket);
    ticket.PageId = pageId;
    ticket.Notes[noteId] = blockIds;

    await $db.update(`ticket-${params.data.id}`, "set", { ticket }, { setIf: "exist" });
    console.log("Note created successfully and db updated successfully");
  },

  appendNote: async function (params) {
    const pageId = await $db.get(`ticket-${params.data.id}`);
    const [childBlock, noteId] = payloadUtils.childBlock(params.data.noteTitle);

    payloadUtils.appendBlock(childBlock, params);

    try {
      const results = await $request.invokeTemplate("appendToExistingPage", {
        context: { page_id: pageId["ticket"]["PageId"] },
        body: JSON.stringify(childBlock)
      })
      const blockIds = utils.returnBlockIds(results);

      let note = `ticket.Notes[${noteId}]`
      await $db.update(`ticket-${params.data.id}`, "set", { [note]: blockIds }, { setIf: "exist" });
      console.log("Note added successfully and db updated successfully");
    } catch (error) {
      console.error(error);
    }

  },

  deleteNote: async function (id) {
    console.log(id.ticket_id);
    console.log(id.note_id);

    try {
      const ticket = await $db.get(`ticket-${id.ticket_id}`);
      const noteId = id.note_id;
      console.log(noteId);
      const noteBlocks = ticket.ticket["Notes"][noteId];
      console.log(noteBlocks);
      for (const block of noteBlocks) {
        await $request.invokeTemplate('deleteBlock', {
          context: { block_id: block }
        })
      }
      console.log("Note deleted successfully");
      const notePath = "ticket.Notes." + id.note_id;
      await $db.update(`ticket-${id.ticket_id}`, "remove", [notePath], { setIf: "exist" });
      console.log("Note removed successfully from the db");
    } catch (error) {
      console.error(error);
    }
  },

  getAllNotes: async function (id) {
    const ticket = await $db.get(id.ticket_id);
    const pageId = ticket.ticket["PageId"];

    const response = await $request.invokeTemplate('getPageBlocks', {
      context: { page_id: pageId }
    });

    const results = JSON.parse(response.response);
    return results["results"];
  }

}


