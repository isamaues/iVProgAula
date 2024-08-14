import { ptLexer as pt } from "./pt/ivprog";
import { enLexer as en } from "./en/ivprog";
import { IVProgLexer } from "./lexer";
/*import * as ES from "./es/ivprog.g4";
import ESFuncs from "./es/langFunctions";
import ESLibs from "./es/langLibs";*/
const lexers: Record<string, IVProgLexer> = {};
lexers["pt"] = pt;
lexers["en"] = en;

export default lexers;
