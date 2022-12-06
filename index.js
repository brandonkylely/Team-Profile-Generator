// TODO: add validation to ensure user inputs are correctly formatted

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const employees = [];


function newEmployee() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'position',
            message: "What is the employee's positon?",
            choices: [
                'Manager',
                'Intern',
                'Engineer',
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email?',
        },
    ]).then(({ position, name, id, email }) => {
        switch (position) {
            case 'Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is their office number?',
                    }
                ]).then(({ officeNumber }) => {
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
                ]).then(({ school }) => {
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
                ]).then(({ github }) => {
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
    ]).then(({ more }) => {
        if (more) {
            newEmployee();
        } else {
            renderHTML();
            // return console.log(employees)
        }
    })
}

function renderHTML() {
    console.log(employees)
    fs.writeFileSync('./index.html',
        `<!DOCTYPE html>
    <html lang="en-US">
    
      <head>
        <meta charset="UTF-8">
        <title>Team Profiles</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="./style.css">
      </head>
    
      <body class="bg-secondary">
        <header>
          <h1 class="pt-4 border bg-info border-dark rounded text-center text-dark"  style="height: 120px;">Team Profiles</h1>
        </header>

        <main>
    <ul class="d-flex justify-content-around" style="list-style-type: none">
        ${makeCard()}
    </ul>
    </main>
    </body>
  
  </html>
  <h2>`
    )
}

function makeCard() {
    let card = "";
    // const newEmployees = 
    employees.forEach(employee => {
        console.log(employee)
        card += `<li>
            <div class="card rounded text-info bg-dark bg-opacity-25" style="width: 18rem">
                <h3 class="card-title">Name: ${employee.getName()}</h3>
                <p class="card-subtitle mb-2 text-mute">Role: ${employee.getRole()}</p>
                <p>ID: ${employee.getId()}</p>
                <a href='mailto:${employee.getEmail()}'>Email: ${employee.getEmail()}</a>
                <p>${employee.getSchool ? employee.getSchoolLabeled() : employee.getGithub ? employee.getGithubLink() : employee.getOfficeNumberLabeled()}</p>
            </div>
        </li>
        `
        // return card
    })
    // console.log(newEmployees)
    return card
}

newEmployee()
