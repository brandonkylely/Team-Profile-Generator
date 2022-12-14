
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email, 'Engineer')
        this.github = github;
    }

    getGithub() {
        return this.github;
    }
    
    getGithubLink() {
        return (`<a href="https://github.com/${this.github}" target="_blank">Github: ${this.github}</a>`)
    }

    getRole() {
        return this.role;
    }
}

module.exports = Engineer;