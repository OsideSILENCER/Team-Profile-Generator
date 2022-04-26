const inquirer = require("inquirer");
const  generateTeam = require("./generateMarkdown");
const fs = require("fs");
const { type } = require("os");


const Engineer = ("./lib/Engineer");
const Intern = ("./lib/Intern");
const Manager = ("./lib/Manager");

const newStaffMemberData = [];

const questions = async () => {
    const answers = await inquirer
inquirer.prompt([
    {
        input: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        input: "input",
        message: "What is your id number?",
        name: "id",
    },
    {
        input: "input",
        message: "Why is your email?",
        name: "email",
    },
    {
        input: "List",
        message: "What is your role?",
        choices: ["Engineer", "Intern", "Manager"],
    },
    ])

    if (answers.role === "Manager") {
        const managerAns = await inquirer
        .prompt([
        {
            input: "input",
            message: "What is your office number?",
            name: "officeNumber",
        },
        ])
        const newManager = new Manager (
            answers.name,
            answers.id,
            answers.email,
            managerAns.officeNumber
        );
        newStaffMemberData.push(newManager);
        }
        else if (answers.role === "Engineer") {
            const githubAns = await inquirer
            .prompt([
                {
                    input: "input",
                    message: "What is your GitHub user name?",
                    name: "github",
                },
            ])
            const newEngineer = new Engineer (
                answers.name,
                answers.id,
                answers.email,
                githubAns.github
            );
            newStaffMemberData.push(newEngineer);
        }
     else if (answers.role === "Intern") {
        const InternAns = await inquirer
        .prompt([
            {
                input: "input",
                message: "What university did you attend?",
                name: "school",
            },
        ])
        const newIntern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            InternAns.school
        );
        newStaffMemberData.push(newIntern);
    };
    
    async function promptQuestions() {
        await questions()

        const addMemberAns = await inquirer
        .prompt([
            {
                name: "addMember",
                type: "List",
                choices: ["Add a new member", "Create team"],
                message: "Whaht would you like to do next?",
            },
        ])
        if (addMemberAns.addMember === "Add a new member"); {
            return promptQuestions()
        }
        return createTeam();
    }
    
    promptQuestions();

    function createTeam () {
        console.log("new guy", newStaffMemberData)
        fs.writeFileSync(
            "./outputindex.html",
            generateTeam(newStaffMemberData),
        );
    }





}