import * as fs from "fs";
import * as readline from "readline";

import { Token, Literal as TokenLiteral } from "./Token";
import * as Lexer from "./lexer";
import * as Parser from "./parser";
import { AstPrinter } from "./visitor/AstPrinter";
import { Executioner, isLong } from "./visitor/Executioner";
import * as BrsError from "./Error";


export function execute(filename: string) {
    fs.readFile(filename, "utf-8", (err, contents) => {
        run(contents);
        if (BrsError.found()) {
            process.exit(1);
        }
        // TODO: Wire up runtime errors so we can use a second exit code
    });
}

export function repl() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.setPrompt("brs> ");

    rl.on("line", (line) => {
        let result = run(line);
        //console.log(stringify(result));

        BrsError.reset();
        rl.prompt();
    });

    rl.prompt();
}

function run(contents: string) {
    const tokens: ReadonlyArray<Token> = Lexer.scan(contents);
    const statements = Parser.parse(tokens);

    console.dir(statements);

    if (BrsError.found()) {
        return;
    }

    const executioner = new Executioner();
    if (!statements) { return; }

    statements.forEach(stmt => {
        // executioner.exec(stmt);
    });
}

function stringify(value: TokenLiteral) {
    if (value === undefined) {
        return "invalid";
    } else if (isLong(value)) {
        return value.toString();
    } else {
        return JSON.stringify(value);
    }
}
