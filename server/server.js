const payloadUtils = require('./payload_utilities');
const utils = require('./utilities');
exports = {
  // getNote : async function (args) {
  //   try{
  //     const response = await $request.invokeTemplate("getPageBlocks", {
  //       context: { page_id: args.id }
  //     });
  //     console.log(JSON.parse(response.response));
  //   }catch(error){
  //     console.error(error);
  //   }
  // }

  createNote: async function(params) {
    const parentBlock = await payloadUtils.parentBlock(id);
    const [childBlock,noteId] = await payloadUtils.childBlock(params.noteTitle);
    const body = {...parentBlock,...childBlock};

    payloadUtils.appendBlock(body,params);

    const pageId = await utils.returnPageIdOnCreatingNote(body);
    console.log("note created successfully");

    const results = await $request.invokeTemplate("getPageBlocks",{
      context:{page_id:pageId}
    })
    console.log(pageId);
    const blockIds = utils.returnBlockIds(results);

    console.log(ticket);
    ticket.PageId= pageId;
    ticket.Notes[noteId] = blockIds;

    await $db.update(`ticket-${id}`,"set",{ ticket },{setIf:"exist"});
    console.log("Note created successfully");


  },

  updateNote: async function() {
    console.log("updated");
  },
  deleteNote: async function() {
   console.log("deleted!!");
  }
  
}



