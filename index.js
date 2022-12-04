// TODO: add validation to ensure user inputs are correctly formatted

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const employees = [];

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
    return inquirer.prompt([
        {
            type:'list',
            name: 'position',
            message: "What is the employee's positon?",
            choices: [
                'Manager',
                'Intern',
                'Engineer',
            ]
        },
        {
            type:'input',
            name: 'name',
            message: "What is the employee's name?",
        },
        {
            type:'input',
            name: 'id',
            message: 'What is their id?',
        },
        {
            type:'input',
            name: 'email',
            message: 'What is their email?',
        },
    ]).then(({position, name, id, email}) => {
        switch(position) {
            case 'Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is their office number?',
                    }
                ]).then(({officeNumber}) => {
                    employees.push(new Manager(name, id, email, officeNumber))
                    another()
                });
                break;
            case 'Intern':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'school',
                        message: 'What is their school name?',
                    }
                ]).then(({school}) => {
                    employees.push(new Intern(name, id, email, school))
                    another()
                });
                break;
            case 'Engineer':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'github',
                        message: 'What is their github?',
                    }
                ]).then(({github}) => {
                    employees.push(new Engineer(name, id, email, github))
                    another()
                });
                break;
            default:
        }
    })
}

function another() {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Would you like to create another employee card?'
        }
    ]).then(({more}) => {
        if (more) {
            newEmployee();
        } else {
            renderHTML();
            return console.log(employees)
        }
    })
}

function renderHTML() {
    fs.writeFileSync('./index.html',
    `<ul>
    ${employees.map(employee => 
        `<li>
            <div>
                <h2>${employee.getName()}</h2>
                <p>${employee.getRole()}</p>
                <p>${employee.getId()}</p>
                <a href='mailto:${employee.getEmail()}'>${employee.getEmail()}</a>
            </div>
        </li>`
        )}
    </ul>`
    )
}

newEmployee()

{/* <p>${employee.getSchool()}</p>
<a href='https://github.com/${employee.getGithub()}'>${employee.getGithub()}</a>
<p>${employee.getOfficeNumber()}</p> */}