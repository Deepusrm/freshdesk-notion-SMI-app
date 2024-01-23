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

  createNote: async function() {
    console.log("created!!");
  },

  updateNote: async function() {
    console.log("updated");
  },
  deleteNote: async function() {
   console.log("deleted!!");
  }
  
}



