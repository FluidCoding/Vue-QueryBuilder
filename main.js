const appSQLTranslate = new Vue({
    el: '#md-form',
    data: {
      sqlVarName: 'SQLStr',
      sqlNewLinesOn: true,
      sqlSingleLineOn: false,
      sqlRaw: '',
      sqlText: '',
      sqlSyntax: ''
    },
    methods: {
      transformSQLStr(){
        const lnEnd = (this.sqlNewLinesOn ? " & vbCrLf" : "");
        let sql = '';
        sql = this.sqlVarName + ' = \"';
        const lines = this.sqlRaw.split(/\n/);
        lines.forEach( (s,i) => {
          if(i>0 && !this.sqlSingleLineOn) sql = sql + '"'+lnEnd+'\n'+this.sqlVarName+' = '+ this.sqlVarName +' & \"';
          if(this.sqlSingleLineOn) s = " " + s;
          sql = sql + s.replace(/\{([^{}]+)\}/g, "\" & $1 & \""  );
        })
        sql = sql + '"'+lnEnd;
        this.sqlText = sql;

        $('#sqlOutSyntax').text(this.sqlRaw);
        $('#sqlOutSyntax').each( (i, block) => hljs.highlightBlock(block));
      }
    }
  });