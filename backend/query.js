const mysql = require("mysql2");
const { studentData, teacherData } = require("./data.js"); // Ensure you have a data.js file exporting the data array

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "myuniversity",
  password: "1234",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// Function to create the table if it doesn't exist
const createStudentTable = () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
            Rollno VARCHAR(100) PRIMARY KEY,
            name VARCHAR(100),
            photo VARCHAR(255),
            branch VARCHAR(50),
            semester VARCHAR(50),
            password VARCHAR(255),
            degree VARCHAR(50)
        )
    `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Table created or already exists:", results);

    // Insert data after ensuring the table exists
    insertData();
  });
};

// Function to insert data into the students table
const insertData = () => {
  studentData.forEach((student) => {
    const { rollno, name, photo, branch, semester, password, degree } = student;
    const query =
      "INSERT INTO students (rollno, name, photo, branch, semester, password, degree) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [rollno, name, photo, branch, semester, password, degree],
      (err, results) => {
        if (err) {
          console.error("Error inserting data:", err);
          return;
        }
        console.log("Data inserted successfully:", results);
      }
    );
  });

  // Close the connection after inserting data
  connection.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err);
      return;
    }
    console.log("Connection closed.");
  });
};
const createTeacherTable = () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS teachers (
            Tid VARCHAR(100) PRIMARY KEY,
            name VARCHAR(100),
            photo VARCHAR(255),
            department VARCHAR(50),
            password VARCHAR(255)
        )
    `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Table created or already exists:", results);

    // Insert data after ensuring the table exists
    insertTeacherData();
  });
};

// Function to insert data into the teachers table
const insertTeacherData = () => {
  teacherData.forEach((teacher) => {
    const { teacherId, name, password, department } = teacher;
    const query =
      "INSERT INTO teachers (Tid, name, password, department, photo) VALUES (?, ?, ?, ?, NULL)";

    connection.query(
      query,
      [teacherId, name, password, department],
      (err, results) => {
        if (err) {
          console.error("Error inserting data:", err);
          return;
        }
        console.log("Data inserted successfully:", results);
      }
    );
  });

  // Close the connection after inserting data
  connection.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err);
      return;
    }
    console.log("Connection closed.");
  });
};
const createSubjectsTable = () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS subjects (
            subject_id Varchar(255) PRIMARY KEY,
            subject_name VARCHAR(255),
            associated_teacher VARCHAR(100),
            branch VARCHAR(50),
            semester Varchar(100),
            Degree VARCHAR(50),
            id varchar(255)
        )
    `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating subjects table:", err);
      return;
    }
    console.log("Subjects table created or already exists:", results);
  });
};
const createAttendanceTable = () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS attendance (
            subject_id Varchar(255),
            subject_name VARCHAR(255),
            student_name VARCHAR(100),
            rollno VARCHAR(100),
            photo VARCHAR(255),
            tot_attendance INT,
            mark_attendance INT,
            branch VARCHAR(50),
            semester varchar(100),
            Degree VARCHAR(50),
            id varchar(100)
        )
    `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating attendance table:", err);
      return;
    }
    console.log("Attendance table created or already exists:", results);
  });
};
// Export the function
module.exports = {
  createStudentTable,
  createTeacherTable,
  createSubjectsTable,
  createAttendanceTable,
};
