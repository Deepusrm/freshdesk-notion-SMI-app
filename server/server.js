
exports = {
  // createNote: async function(args) {
  //   const { noteTitle, noteContent } = args;
  //   try {
  //     const response = await $request.post("https://api.notion.com/v1/pages", {
  //       headers: {
  //         "Authorization": "Bearer <your_notion_api_key>",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         "note_title": noteTitle,
  //         "note_content": noteContent
  //       })
  //     });
  //     return JSON.parse(response);
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  // },

  // updateNote: async function(args) {
  //   const { pageId, noteTitle, noteContent } = args;
  //   try {
  //     const response = await $request.patch(`https://api.notion.com/v1/pages/${pageId}`, {
  //       headers: {
  //         "Authorization": "Bearer <your_notion_api_key>",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         "note_title": noteTitle,
  //         "note_content": noteContent
  //       })
  //     });
  //     return JSON.parse(response);
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  // },

  // deleteNote: async function(args) {
  //   const { pageId } = args;
  //   try {
  //     const response = await $request.delete(`https://api.notion.com/v1/pages/${pageId}`, {
  //       headers: {
  //         "Authorization": "Bearer <your_notion_api_key>",
  //         "Content-Type": "application/json"
  //       }
  //     });
  //     return JSON.parse(response);
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  // }
};
