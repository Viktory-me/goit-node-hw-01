const { v4 } = require("uuid");
const fs = require("fs/promises");
const contactsPath = require("../utils/contactsPath");
const getAllContacts = require("./getAllContacts");

async function addContact(name, email, phone) {
  try {
    const contacts = await getAllContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}
module.exports = addContact;
