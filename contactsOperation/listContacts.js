const getAllContacts = require("./getAllContacts");

async function listContacts() {
  try {
    const contacts = await getAllContacts();
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}
module.exports = listContacts;
