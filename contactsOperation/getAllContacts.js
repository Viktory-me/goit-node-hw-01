const fs = require("fs/promises");
const contactsPath = require("../utils/contactsPath");

const getAllContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllContacts;
