const { Command } = require("commander");
const contactsOperation = require("./contactsOperation/index");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      await contactsOperation.listContacts();
      break;

    case "get":
      await contactsOperation.getContactById(id);
      break;

    case "add":
      await contactsOperation.addContact(name, email, phone);
      break;

    case "remove":
      await contactsOperation.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
