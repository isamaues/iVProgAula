import * as moo from "moo";
import { combineRegex } from "./helper";

export interface I18N_LEXER_TYPES {
  RK_INTEGER: string;
  RK_REAL: string;
  RK_CHARACTER: string;
  RK_STRING: string;
  RK_BOOLEAN: string;
}

export interface I18N_LEXER_BOOLVAL {
  RK_FALSE: string;
  RK_TRUE: string;
}

export interface I18N_LEXER_LOGICOP {
  RK_LOGICAL_NOT: string;
  RK_LOGICAL_AND: string;
  RK_LOGICAL_OR: string;
}

export interface I18N_LEXER_COMMANDS {
  RK_PROGRAM: string;
  RK_VOID: string;
  RK_SWITCH: string;
  RK_CASE: string;
  RK_DEFAULT: string;
  RK_CONST: string;
  RK_FUNCTION: string;
  RK_RETURN: string;
  RK_FOR: string;
  RK_FOR_ALT: string;
  RK_FOR_FROM: string;
  RK_FOR_TO: string;
  RK_FOR_PASS: string;
  RK_BREAK: string;
  RK_DO: string;
  RK_DO_UNTIL: string;
  RK_WHILE: string;
  RK_WHILE_ALT: string;
  RK_IF: string;
  RK_ELSE: string;
  RK_REFERENCE: string;
}

export interface I18N_LANG_LIBS {
  $ioLib: string;
  $strLib: string;
  $mathLib: string;
  $langLib: string;
  $arrayLib: string;
}

export interface I18N_LANG_FUNCS {
  main_function: string;
  $read: string;
  $write: string;
  $numElements: string;
  $matrixLines: string;
  $matrixColumns: string;
  $substring: string;
  $length: string;
  $uppercase: string;
  $lowercase: string;
  $charAt: string;
  $isReal: string;
  $isInt: string;
  $isBool: string;
  $castReal: string;
  $castInt: string;
  $castBool: string;
  $castString: string;
  $castChar: string;
  $sin: string;
  $cos: string;
  $tan: string;
  $sqrt: string;
  $pow: string;
  $log: string;
  $abs: string;
  $negate: string;
  $invert: string;
  $max: string;
  $min: string;
  $rand: string;
}

export interface I18nLexer {
  commands: I18N_LEXER_COMMANDS;
  logicOp: I18N_LEXER_LOGICOP;
  boolVal: I18N_LEXER_BOOLVAL;
  types: I18N_LEXER_TYPES;
  langLibs: I18N_LANG_LIBS;
  langFuncs: I18N_LANG_FUNCS;
}

export class IVProgLexer {
  constructor (
    private RKs: Record<string, string>,
    public lexer: moo.Lexer,
    private rules: I18N_LEXER_RULES,
    private i18nLexer: I18nLexer
  ) {}

  getReservedKeys (): Record<string, string> {
    return this.RKs;
  }

  getRules (): I18N_LEXER_RULES {
    return this.rules;
  }

  getTypeKeys (): I18N_LEXER_TYPES {
    return this.i18nLexer.types;
  }

  getLangLibs (): I18N_LANG_LIBS {
    return this.i18nLexer.langLibs;
  }

  getLangFuncs (): I18N_LANG_FUNCS {
    return this.i18nLexer.langFuncs;
  }
}

export interface I18N_LEXER_RULES
  extends I18N_LEXER_TYPES,
    I18N_LEXER_COMMANDS,
    I18N_LEXER_BOOLVAL,
    I18N_LEXER_LOGICOP {
  OPEN_BRACE: string;
  CLOSE_BRACE: string;
  OPEN_PARENTHESIS: string;
  CLOSE_PARENTHESIS: string;
  OPEN_CURLY: string;
  CLOSE_CURLY: string;
  COMMA: string;
  ASSIGNMENT: string;
  REAL: string;
  INTEGER: string;
  SUM_OP: string;
  MULTI_OP: string;
  RELATIONAL_OPERATOR: string;
  COLON: string;
  STRING: string;
  CHARACTER: string;
  EOS: string;
  WHITESPACE: string;
  COMMENTS: string;
  RK_REFERENCE: string;
  ID: string;
  DOT: string;
  ERROR: string;
}

// General Regex Rules
const ID = "[a-zA-Z_][a-zA-Z0-9_]*";
const HEX_DIGIT = "[0-9a-fA-F]";
const OCTAL_DIGIT = "[0-7]";
const ESC_OCTAL = RegExp(
  `\\\\[0-3]${OCTAL_DIGIT}${OCTAL_DIGIT}|\\\\${OCTAL_DIGIT}${OCTAL_DIGIT}|\\\\${OCTAL_DIGIT}`
);
const ESC_UNICODE = RegExp(
  `\\\\u${HEX_DIGIT}${HEX_DIGIT}${HEX_DIGIT}${HEX_DIGIT}`
);
const ESC_SEQ_BASE = /\\[b,t,n,f,r,",',\\]|/;
const ESC_SEQ = combineRegex`${ESC_SEQ_BASE}|${ESC_UNICODE}|${ESC_OCTAL}`;
const STRING_CHARACTER = combineRegex`${ESC_SEQ}|[^"\\\\]`;

export function makeLexer (lexer: I18nLexer): IVProgLexer {
  const RKs: Record<string, string> = {};
  const rules: Record<string, string> = {};
  Object.entries(lexer.types).forEach(([key, value]) => {
    RKs[key] = value;
    rules[key] = key;
  });
  Object.entries(lexer.boolVal).forEach(([key, value]) => {
    RKs[key] = value;
    rules[key] = key;
  });
  Object.entries(lexer.commands).forEach(([key, value]) => {
    RKs[key] = value;
    rules[key] = key;
  });
  RKs["RK_LOGICAL_AND"] = lexer.logicOp.RK_LOGICAL_AND;
  RKs["RK_LOGICAL_OR"] = lexer.logicOp.RK_LOGICAL_OR;
  RKs["RK_LOGICAL_NOT"] = lexer.logicOp.RK_LOGICAL_NOT;

  rules["RK_LOGICAL_AND"] = "RK_LOGICAL_AND";
  rules["RK_LOGICAL_OR"] = "RK_LOGICAL_OR";
  rules["RK_LOGICAL_NOT"] = "RK_LOGICAL_NOT";

  const RESERVED_KEYS = moo.keywords(RKs);

  const lexerRules: moo.Rules = {
    COMMENTS: { match: /\/\/[^$]*?$|\/\*[^$]*?\*\//, lineBreaks: true },
    OPEN_BRACE: /\[/,
    CLOSE_BRACE: /\]/,
    OPEN_PARENTHESIS: /\(/,
    CLOSE_PARENTHESIS: /\)/,
    OPEN_CURLY: /\{/,
    CLOSE_CURLY: /\}/,
    COMMA: /,/,
    ASSIGNMENT: /<-|←/,
    REAL: /[0-9]+\.[0-9]*[eE][+-]?[0-9]+|[0-9]+\.[0-9]+/,
    INTEGER: RegExp(`(?:0x|0X)${HEX_DIGIT}+|(?:0b|0B)[0-1]+|[0-9]+`),
    SUM_OP: /[+-]/,
    MULTI_OP: /[*/%]/,
    RELATIONAL_OPERATOR: />=|==|<=|>|<|!=/,
    COLON: /:/,
    STRING: combineRegex`"(?:${STRING_CHARACTER})*?"`,
    CHARACTER: combineRegex`'(?:${ESC_SEQ}|[^'\\\\])'`,
    EOS: { match: /;\r?\n?|[\r\n]+/, lineBreaks: true },
    WHITESPACE: /(?: |\t)+/,
    RK_REFERENCE: RegExp(lexer.commands.RK_REFERENCE),
    ID: { match: RegExp(ID), type: RESERVED_KEYS },
    DOT: /\./,
    ERROR: { match: /[\$?`]/, error: true },
  };
  Object.entries(lexerRules).forEach(([key, _]) => (rules[key] = key));
  const moolexer = moo.compile(lexerRules);
  return new IVProgLexer(RKs, moolexer, rules as unknown as I18N_LEXER_RULES, lexer);
}
