import {
  I18N_LEXER_TYPES,
  I18N_LEXER_COMMANDS,
  I18N_LEXER_BOOLVAL,
  I18N_LEXER_LOGICOP,
  makeLexer,
  I18N_LANG_LIBS,
  I18N_LANG_FUNCS,
} from "../lexer";

// i18n lexer strings for the language.
const types: I18N_LEXER_TYPES = {
  // types
  RK_REAL: "real",
  RK_INTEGER: "int",
  RK_BOOLEAN: "bool",
  RK_CHARACTER: "char",
  RK_STRING: "string",
};
const commands: I18N_LEXER_COMMANDS = {
  // RK_VOID is not formally part of Types since it doesn't have a valid value/instance
  RK_VOID: "void",
  // commands
  RK_PROGRAM: "program",
  RK_SWITCH: "switch",
  RK_CASE: "case",
  RK_DEFAULT: "otherwise",
  RK_CONST: "const",
  RK_FUNCTION: "function",
  RK_RETURN: "return",
  RK_FOR: "for",
  RK_FOR_ALT: "repeat_for",
  RK_FOR_FROM: "from",
  RK_FOR_TO: "to",
  RK_FOR_PASS: "pass",
  RK_BREAK: "break",
  RK_DO: "repeat",
  RK_DO_UNTIL: "until",
  RK_WHILE: "while",
  RK_WHILE_ALT: "repeat_while",
  RK_IF: "if",
  RK_ELSE: "else",
  RK_REFERENCE: "&",
};
const boolVal: I18N_LEXER_BOOLVAL = {
  RK_FALSE: "false",
  RK_TRUE: "true",
};

const logicOp: I18N_LEXER_LOGICOP = {
  RK_LOGICAL_NOT: "not",
  RK_LOGICAL_AND: "AND",
  RK_LOGICAL_OR: "OR",
};

const langLibs: I18N_LANG_LIBS = {
  $mathLib: "Mathematics",
  $ioLib: "IO",
  $strLib: "Text",
  $arrayLib: "Array",
  $langLib: "Conversion",
};

const langFuncs: I18N_LANG_FUNCS = {
  main_function: "main",
  $read: "read",
  $write: "write",
  $numElements: "total_of_elements",
  $matrixLines: "total_of_lines",
  $matrixColumns: "total_of_columns",
  $substring: "substring",
  $length: "length",
  $uppercase: "uppercase",
  $lowercase: "lowercase",
  $charAt: "char_at",
  $isReal: "is_real",
  $isInt: "is_integer",
  $isBool: "is_logic",
  $castReal: "to_real",
  $castInt: "to_integer",
  $castBool: "to_logic",
  $castString: "to_string",
  $castChar: "to_char",
  $sin: "sin",
  $cos: "cos",
  $tan: "tan",
  $sqrt: "sqrt",
  $pow: "pow",
  $log: "log",
  $abs: "abs",
  $negate: "negate",
  $invert: "invert",
  $max: "maximum",
  $min: "minimum",
  $rand: "random",
};
// END i18n lexer strings
export const enLexer = makeLexer({
  commands,
  boolVal,
  logicOp,
  types,
  langLibs,
  langFuncs,
});
