const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const { table } = require("console");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const getAllContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

async function listContacts() {
  try {
    const contacts = await getAllContacts();
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getAllContacts();
    const contact = contacts.find(
      (contact) => String(contact.id) === String(contactId)
    );
    if (!contact) {
      return null;
    }
    console.table(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getAllContacts();
    const idx = contacts.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (idx === -1) {
      return null;
    }
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

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

module.exports = { listContacts, getContactById, removeContact, addContact };
