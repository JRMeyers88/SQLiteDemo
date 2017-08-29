'use strict'

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('conpany.sqlite', (err) => console.log('Connected'));

db.run('DROP TABLE IF EXISTS employees');

const createEmployeeTable = () => {
    db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, department TEXT)", populateEmployees)
};

const populateEmployees = () => {
    const {list} = require('./employees.json');

    list.forEach( (employee) => {
        db.run(`INSERT INTO employees VALUES(
            ${employee.id},
            "${employee.firstname}",
            "${employee.lastname}",
            ${employee.salary},
            "${employee.dept}")`
        )
    })
};
createEmployeeTable();

setTimeout( () => {
    db.all('SELECT * FROM employees', (err, allRows) => {
        if (err) {
            return console.log('err?', err.toString());
        }
            // sort alphabetically by first name
            // show employees who make 50k+
            // make arr of first/last names and salary
        allRows.sort( (a,b) => a.first.localeCompare(b.first) )
        .filter( (emp) => emp.salary > 50000)
        .map( (emp) => `${emp.first} ${emp.last}'s salary: ${emp.salary}`)
        .forEach( (emp) => console.log(`${emp}`));
    });
}, 500);


// setTimeout( () => {
//     // db.all(`SELECT first, last, salary 
//     //         FROM employees 
//     //         WHERE salary > 50000 
//     //         ORDER BY first`, (err, allRows) => {
//     //     console.log('all rows', allRows);
//     // });
// }, 500);


// setTimeout( () => {
//     db.each('SELECT * FROM employees', (err, { id, first, last, department, salary}) => {
//         if (err) {
//             return console.log(err.toString());
//         }

//         console.log(`${id} ${first} ${last} ${department} ${salary}`);
//     });
// }, 500);

