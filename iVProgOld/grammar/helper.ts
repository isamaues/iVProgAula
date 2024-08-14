export function combineRegex(strings: TemplateStringsArray, ...pieces: any[]) {
  return new RegExp(
    strings.raw
      .map(
        (r, i) =>
          r + (pieces[i] === undefined ? "" : "(?:" + pieces[i].source + ")")
      )
      .join("")
  );
}
