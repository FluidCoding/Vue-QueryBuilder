const appSQLTranslate = new Vue({
  el: "#md-form",
  data: {
    sqlVarName: "SQLStr",
    sqlNewLinesOn: true,
    sqlSingleLineOn: false,
    sqlRaw: "",
    sqlText: "",
    sqlSyntax: "",
    theme: "dark",
    sqlParamQueryOn: false,
    sqlParams: []
  },
  methods: {
    callTransform(t) {
      if (this.sqlParamQueryOn) this.transformSQLParamStr();
      else this.transformSQLStr();
    },
    transformSQLStr() {
      const lnEnd = this.sqlNewLinesOn ? " & vbCrLf" : "";
      let sql = "";
      sql = this.sqlVarName + ' = "';
      const lines = this.sqlRaw.split(/\n/);
      lines.forEach((s, i) => {
        if (i > 0) {
          if (this.sqlSingleLineOn) s = " " + s;
          else sql = sql + '"' + lnEnd + "\n" + this.sqlVarName + " = " + this.sqlVarName + ' & "';
        }
        sql = sql + s.replace(/\{([^{}]+)\}/g, '" & $1 & "');
      });
      sql = sql + '"' + lnEnd;
      this.sqlText = sql;

      $("#sqlOutSyntax").text(this.sqlRaw);
      $("#sqlOutSyntax").each((i, block) => hljs.highlightBlock(block));
    },
    transformSQLParamStr() {
      const lnEnd = this.sqlNewLinesOn ? " & vbCrLf" : "";
      let sql = "";
      sql = this.sqlVarName + ' = "';
      const lines = this.sqlRaw.split(/\n/);
      let params = "";
      lines.forEach((s, i) => {
        if (i > 0) {
          if (this.sqlSingleLineOn) s = " " + s + params;
          else sql = sql + '"' + lnEnd + params + "\n" + this.sqlVarName + " = " + this.sqlVarName + ' & "';
        }
        params = (s.match(/\?:{(\s*[^{}]+\s*)}/g) || []).join("").replace(/\?:{([^{}]+)\}/g, " :sqlParam($1) ");
        s = s.replace(/\?:{(\s*[^{}]+\s*)}/g, "? ");
        if (s.match(/\{([^{}]+)\}/g) !== null) {
          s = s.replace(/\{([^{}]+)\}/g, '" & $1 & "');
        }
        sql += s;
      });
      sql = sql + "" + lnEnd;
      this.sqlText = sql;

      $("#sqlOutSyntax").text(this.sqlRaw);
      $("#sqlOutSyntax").each((i, block) => hljs.highlightBlock(block));
    }
  }
});
var test = $("#sqlRaw");
