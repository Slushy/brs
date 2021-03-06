const Parser = require("../../../lib/parser");
const Expr = require("../../../lib/parser/Expression");
const Stmt = require("../../../lib/parser/Statement");
const { Lexeme } = require("../../../lib/Lexeme");
const BrsError = require("../../../lib/Error");

const { token, EOF } = require("../ParserTests");

describe("parser", () => {
    afterEach(() => BrsError.reset());

    describe("primary expressions", () => {
        it("parses literals", () => {
            let numeric = Parser.parse([
                token(Lexeme.Integer, 5),
                EOF
            ]);
            expect(numeric).toEqual([
                new Stmt.Expression(
                    new Expr.Literal(5)
                )
            ]);

            let parsedString = Parser.parse([
                token(Lexeme.String, "hello"),
                EOF
            ]);
            expect(parsedString).toEqual([
                new Stmt.Expression(
                    new Expr.Literal("hello")
                )
            ]);
        });

        it("parses identifiers");

        it("parses expressions in parentheses", () => {
            let withParens = Parser.parse([
                token(Lexeme.Integer, 1),
                token(Lexeme.Plus),
                token(Lexeme.LeftParen),
                token(Lexeme.Integer, 2),
                token(Lexeme.Star),
                token(Lexeme.Integer, 3),
                token(Lexeme.RightParen),
                EOF
            ]);
            expect(withParens).toBeDefined();
            expect(withParens).not.toBeNull();
            expect(withParens).toMatchSnapshot();
        });
    });
});