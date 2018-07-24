var appSQLTranslate = new Vue({
    el: '#md-form',
    data: {
      sqlVarName: 'SQLStr',
      sqlNewLinesOn: true,
      sqlRaw: '',
      sqlText: '',
      sqlSyntax: ''
    },
    methods: {
      transformSQLStr: function(event){
        const lnEnd = (this.sqlNewLinesOn?" & vbCrLf" : "");
        let sql = '';
        sql = this.sqlVarName + ' = \"';
        const lines = this.sqlRaw.split(/\n/);
        lines.forEach( (s,i) => {
          if(i>0) sql = sql + '"'+lnEnd+'\n'+this.sqlVarName+' = '+ this.sqlVarName +' & \"';
          sql = sql + s.replace(/\{([^{}]+)\}/g, "\" & $1 & \""  );
        })
        sql = sql + '"'+lnEnd;
        this.sqlText = sql;

        $('#sqlOutSyntax').text(this.sqlRaw);
        $('#sqlOutSyntax').each( (i, block) => hljs.highlightBlock(block));
      }
    }
  })
