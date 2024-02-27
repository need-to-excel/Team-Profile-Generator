const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'ManagerName',
      message: 'What is your name?',
    },
    {
      type: 'input',
      name: 'ManagerID',
      message: 'What is your employee ID?',
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'What is your email?',
    },
    {
      type: 'input',
      name: 'OfficeNumber',
      message: 'What is your office number?',
    },
    {
      type: 'list',
      name: 'teamMembers',
      message: 'Please select if you have in your team?',
      choices: ['Engineer', 'Intern', 'None']
    },
    {
      type: 'input',
      name: 'school',
      message: 'Please enter your school name',
      when: data=>data.teamMembers === "Intern"
    },
    {
      type: 'input',
      name: 'github',
      message: 'Please enter your github profile link',
      when: data=>data.teamMembers === "Engineer"
    },
 ]).then(results => {
  console.log(results)
  const team = [];
  const manager = new Manager(results.ManagerName, results.ManagerID, results.ManagerEmail, results.OfficeNumber);
  team.push(manager)
  console.log(manager)
  const engineer = new Engineer(results.ManagerName, results.ManagerID, results.ManagerEmail, results.github);
  team.push(engineer);
  console.log(engineer)
  const intern = new Intern(results.ManagerName, results.ManagerID, results.ManagerEmail, results.school);
  team.push(intern);
  console.log(intern)
  let htmlString = render(team)
  console.log(htmlString)
  writeToFile("TeamProfile.html", htmlString)
});

 function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

 promptUser();