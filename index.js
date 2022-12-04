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

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
newEmployee()
function newEmployee() {
    inquirer.createPromptModule([
        {
            type:'list',
            name: 'position',
            message: 'What position is this employee?',
            choices: [
                'Manager',
                'Intern',
                'Engineer',
            ]
        },
        {
            type:'input',
            name: 'name',
            message: 'What name is this employee?',
        },
        {
            type:'input',
            name: 'id',
            message: 'What id is this employee?',
        },
        {
            type:'input',
            name: 'email',
            message: 'What email is this employee?',
        },
    ]).then(({position, name, id, email}) => {
        switch(position) {
            case 'Manager':
                inquirer.createPromptModule([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is the office number?',
                    }
                ]).then(({officeNumber}) => {
                    employees.push(new Manager(name, id, email, officeNumber))
                })
    
                break;
            case 'Intern':
    
                break;
            case 'Engineer':
    
                break;
            default:
        }
        inquirer.createPromptModule() [
            {
                type: 'confirm',
                name: 'continue',
                message: 'Would you like to create another employee card?'
            }
        ].then(({more}) => {
            if (more) {
                newEmployee();
            } else {
                renderHTML();
            }
        })
    })
}