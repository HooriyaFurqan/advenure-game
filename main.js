#! /usr/bin/env code
import chalk from "chalk";
import inquirer from "inquirer";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}
(async () => {
    let player = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Please Enter Your Name:",
    });
    let opponent = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Select Your Opponent",
        choices: ["Skeleton", "Assassin", "Zombie"]
    });
    let p1 = new Player(player.name);
    let o1 = new Opponent(opponent.select);
    while (true) {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select Your Action",
            choices: ["Attack", "Drink Portion", "Run For Your Life"],
        });
        if (ask.option == "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
                console.log(chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`));
                console.log(chalk.bold.green(`${o1.name} fuel is ${o1.fuel}`));
                if (p1.fuel <= 0) {
                    console.log(chalk.red.bold.italic("You Lose, Better Luck Next Time"));
                    process.exit();
                }
            }
            else {
                o1.fuelDecrease();
                console.log(chalk.bold.red(`${o1.name} fuel is ${o1.fuel}`));
                console.log(chalk.bold.green(`${o1.name} fuel is ${o1.fuel}`));
                if (o1.fuel <= 0) {
                    console.log(chalk.green.bold.italic("You Win"));
                    process.exit();
                }
            }
        }
        else if (ask.option == "Drink Portion") {
            p1.fuelIncrease();
            console.log(chalk.bold.italic.green(`You Drink Health Portion. Your fuel is ${p1.fuel}`));
        }
        else if (ask.option == "Run For Your Life") {
            console.log(chalk.red.bold.italic("You Lose, Better Luck Next Time"));
            process.exit();
        }
    }
})();
