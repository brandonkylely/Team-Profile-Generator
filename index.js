// TODO: npm install jest
// TODO: create unit tests for application

// TODO: npm install inquirer@8.2.4
// TODO: question for team members and info
// TODO: generate html
// TODO: mailto email anchor tags, github profile anchor tags
// TODO: on start, enter manager name, employee id, email, and office number
// TODO: on manager info, can add engineer or intern to team, or finish team
// TODO: on engineer, question for name, id, email, github username, then return
// TODO: on intern, name, id, email, school, then return
// TODO: on finish team, exit terminal application and html is generated
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
                <p>${employee.getEmail()}</p>
            </div>
        </li>`
        )}
    </ul>`
    )
}

newEmployee()