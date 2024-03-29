const payloadUtils = require('./payload_utilities');
const utils = require('./utilities');
exports = {
  createNote: async function (params) {
    const parentBlock = payloadUtils.parentBlock(params.data.ticket_id);
    const [childBlock, noteId] = payloadUtils.childBlock(params.data.noteTitle);
    const body = { ...parentBlock, ...childBlock };

    payloadUtils.appendBlock(body, params);

    let pageId = null;
    let url = null;
    try {
      [pageId,url]= await utils.returnPageIdOnCreatingNote(body);
      console.log("note created successfully"); 
    } catch (error) {
      console.error(error);
    }

    try {
      const results = await $request.invokeTemplate("getPageBlocks", {
        context: { page_id: pageId }
      })
      console.log(pageId);
      const blockIds = utils.returnBlockIds(results);

      const ticket = params.data.ticket;
      console.log(ticket);
      ticket.PageId = pageId;
      ticket.Notes[noteId] = blockIds;
      ticket.url = url;

      await $db.update(`ticket-${params.data.ticket_id}`, "set", { ticket }, { setIf: "exist" });
      console.log("Note created successfully and db updated successfully");
      renderData(null,"Note created successfully");
    } catch (error) {
      console.error(error);
      renderData(error.message,null);
    }
  },

  appendNote: async function (params) {
    const pageId = await $db.get(`ticket-${params.data.ticket_id}`);
    const [childBlock, noteId] = payloadUtils.childBlock(params.data.noteTitle);

    payloadUtils.appendBlock(childBlock, params);

    try {
      const results = await $request.invokeTemplate("appendToExistingPage", {
        context: { page_id: pageId["ticket"]["PageId"] },
        body: JSON.stringify(childBlock)
      })
      const blockIds = utils.returnBlockIds(results);

      let note = `ticket.Notes[${noteId}]`
      await $db.update(`ticket-${params.data.ticket_id}`, "set", { [note]: blockIds }, { setIf: "exist" });
      console.log("Note added successfully and db updated successfully");
      renderData(null,"Note added successfully");
    } catch (error) {
      console.error(error);
      const customError = new Error(error.message);
      renderData(customError,null);
    }

  },

  deleteNote: async function (id) {
    try {
      const ticket = await $db.get(`ticket-${id.ticket_id}`);
      const noteId = id.note_id;
      const noteBlocks = ticket.ticket["Notes"][noteId];

      if (!Array.isArray(noteBlocks)) {
        renderData(null, "Note doesn't exist");
        return;
      }

      for (const block of noteBlocks) {
        await $request.invokeTemplate('deleteBlock', {
          context: { block_id: block }
        })
      }
      console.log("Note deleted successfully");
      const notePath = "ticket.Notes." + id.note_id;
      await $db.update(`ticket-${id.ticket_id}`, "remove", [notePath], { setIf: "exist" });
      console.log("Note removed successfully from the db");
      renderData(null,'Note deleted successfully');
    } catch (error) {
      console.error(error);
      const customError = new Error(error.message,null);
      renderData(customError,null);
    }
  },
}


