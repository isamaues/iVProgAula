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
  RK_INTEGER: "inteiro",
  RK_BOOLEAN: "logico",
  RK_CHARACTER: "caractere",
  RK_STRING: "cadeia",
};
const commands: I18N_LEXER_COMMANDS = {
  // RK_VOID is not formally part of Types since it doesn't have a valid value/instance
  RK_VOID: "vazio",
  // commands
  RK_PROGRAM: "programa",
  RK_SWITCH: "escolha",
  RK_CASE: "caso",
  RK_DEFAULT: "contrario",
  RK_CONST: "const",
  RK_FUNCTION: "funcao",
  RK_RETURN: "devolva",
  RK_FOR: "para",
  RK_FOR_ALT: "repita_para",
  RK_FOR_FROM: "de",
  RK_FOR_TO: "ate",
  RK_FOR_PASS: "passo",
  RK_BREAK: "pare",
  RK_DO: "repita",
  RK_DO_UNTIL: "ate_que",
  RK_WHILE: "enquanto",
  RK_WHILE_ALT: "repita_enquanto",
  RK_IF: "se",
  RK_ELSE: "senao",
  RK_REFERENCE: "&",
};
const boolVal: I18N_LEXER_BOOLVAL = {
  RK_FALSE: "falso",
  RK_TRUE: "verdadeiro",
};

const logicOp: I18N_LEXER_LOGICOP = {
  RK_LOGICAL_NOT: "nao",
  RK_LOGICAL_AND: "E",
  RK_LOGICAL_OR: "OU",
};

const langLibs: I18N_LANG_LIBS = {
  $mathLib: "Matematica",
  $ioLib: "ES",
  $strLib: "Texto",
  $arrayLib: "Arranjo",
  $langLib: "Conversao",
};

const langFuncs: I18N_LANG_FUNCS = {
  main_function: "inicio",
  $read: "leia",
  $write: "escreva",
  $numElements: "total_de_elementos",
  $matrixLines: "total_de_linhas",
  $matrixColumns: "total_de_colunas",
  $substring: "subcadeia",
  $length: "comprimento",
  $uppercase: "caixa_alta",
  $lowercase: "caixa_baixa",
  $charAt: "caractere_na_posicao",
  $isReal: "e_real",
  $isInt: "e_inteiro",
  $isBool: "e_logico",
  $castReal: "como_real",
  $castInt: "como_inteiro",
  $castBool: "como_logico",
  $castString: "como_cadeia",
  $castChar: "como_caractere",
  $sin: "seno",
  $cos: "cosseno",
  $tan: "tangente",
  $sqrt: "raiz_quadrada",
  $pow: "potencia",
  $log: "logaritmo",
  $abs: "modulo",
  $negate: "trocar_sinal",
  $invert: "inverter_valor",
  $max: "maximo",
  $min: "minimo",
  $rand: "numero_aleatorio",
};
// END i18n lexer strings
export const ptLexer = makeLexer({
  commands,
  boolVal,
  logicOp,
  types,
  langLibs,
  langFuncs,
});
