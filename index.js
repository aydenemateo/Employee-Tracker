const inquirer = require ('inquirer');
const mysql = require ('mysql2');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employee_db'
    },
    console.log (`Connected to Employee Database`)
);

async function viewDepartment() {
    const results = await db.promise().query ("SELECT * FROM departments;")
    if (results) {
        console.table (results[0]);
    }
}

async function viewRoles() {
    const roles = await db.promise().query("SELECT * FROM roles;")
    if (roles) {
        console.table(roles[0]);
    }
}

async function addDepartment() {
    const newDepartment = await db.promise().query ("SELECT * FROM departments;")
    const addedDepartment = newDepartment [0].map (({ name }) => ({ name: name }))
    console.log (addedDepartment)
    const data =await inquirer.prompt (
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'addDepartment',
        },
    )
    
    if (data) {
        const res = db.promise().query (`INSERT INTP departments (name) VALUES ("${data.addDepartment}");`);
        console.log ("Success", res);
        const results = await db.promise().query ("SELECT * FROM departments;")
        if (results) {
            console.table (results[0]);
        }
    }
}

async function addRole() {
    const roles = await db.promise().query ("SELECT * FROM departments;")
    const departmentList = roles[0].map (({ id, name }) => ({ name: name, value: id }))

    const data = await inquirer.prompt([{
        type: "input",
        message: "What name would you like to assign the role?",
        name: "role",
    },
    {
        type: "input",
        message: "What is the salary of this role?",
        name: "roleSalary",
    },
    {
        type: "list",
        message: "What department does this role belong to?",
        name: "roleDepartment",
        choices: departmentList,
    },
    ])

    if (data) {
        const res = db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.role}", ${data.roleSalary}, ${data.roledepartment});`);
        console.log("success", res);
        const results = await db.promise().query("SELECT * FROM roles;")
        if (results) {
            console.table(results[0]);
        }
    }
}

async function addEmployee() {
    const roles = await db.promise().query ("SELELCT * FROM roles;")
    
}