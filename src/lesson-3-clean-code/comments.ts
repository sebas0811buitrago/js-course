// (c) Maximilian Schwarzmüller / Academind GmbH
// Created in 2020

i;

// ***************
// GLOBALS
// ***************
let sqlDriver: any;
let mongoDbDriver: any;

// ***************
// CLASSES
// ***************
// Acts as an adapter, connecting models to various database engines (SQL, MongoDB)
class Database {
  private dbDriver: any; // the database engine to which we connect

  loadDatabaseDriver(driver: string) {
    if (driver === "sql") {
      // Connect to the SQL Driver if "driver" is set to SQL
      this.dbDriver = sqlDriver;
    } else {
      // Otherwise, connect to MongoDB
      this.dbDriver = mongoDbDriver;
    }
  }

  connect() {
    this.dbDriver.connect(); // This may fail and throw an error
  }

  insertData(data: any) {
    this.dbDriver.insert(data); // updates a user
  }

  findOne(id: string) {
    // Todo: Needs to be implemented
  }

  // findMany(filter: any) {
  //   this.dbDriver.find(filter);
  // }
}

// accepts [text]@[text].[text], i.e. it simply requires an "@" and a dot
const emailRegex = /\S+@\S+\.\S+/;

// Only works in browser environment
localStorage.setItem("user", "test@test.com");

const path = require("path");
const fs = require("fs");

class DiskStorage {
  constructor(storageDirectory) {
    this.storagePath = path.join(__dirname, storageDirectory);
    this.setupStorageDirectory();
  }

  setupStorageDirectory() {
    if (!fs.existsSync(this.storagePath)) {
      this.createStorageDirectory();
    } else {
      console.log("Directory exists already.");
    }
  }

  createStorageDirectory() {
    fs.mkdir(this.storagePath, this.handleOperationCompletion);
  }

  insertFileWithData(fileName, data) {
    if (!fs.existsSync(this.storagePath)) {
      console.log("The storage directory hasn't been created yet.");
      return;
    }
    const filePath = path.join(this.storagePath, fileName);
    fs.writeFile(filePath, data, this.handleOperationCompletion);
  }

  handleOperationCompletion(error) {
    if (error) {
      this.handleFileSystemError(error);
    } else {
      console.log("Operation completed.");
    }
  }

  handleFileSystemError(error) {
    if (error) {
      console.log("Something went wrong - the operation did not complete.");
      console.log(error);
    }
  }
}

const logStorage = new DiskStorage("logs");
const userStorage = new DiskStorage("users");

setTimeout(function () {
  logStorage.insertFileWithData("2020-10-1.txt", "A first demo log entry.");
  logStorage.insertFileWithData("2020-10-2.txt", "A second demo log entry.");
  userStorage.insertFileWithData("max.txt", "Maximilian Schwarzmüller");
  userStorage.insertFileWithData("maria.txt", "Maria Jones");
}, 1500);

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {}
