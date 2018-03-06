var appSQLTranslate = new Vue({
    el: '#md-form',
    data: {
      sqlVarName: 'SQLStr',
      preseveNewLine: true,
      sqlRaw: '',
      sqlText: '',
      sqlSyntax: ''
    },
    methods: {
      transformSQLStr: function(event){
        //& vbCrLf
        const lnEnd = (this.preseveNewLine?" & vbCrLf" : "");
        // let sql = this.sqlRaw;
        let sql = '';
        sql = this.sqlVarName + ' = \"';
        // Replace Variables 
          // string type
          // sql = sql.replace(/\{'(\w+)\}'/gm, "\" & $1 \" & \"'"  );
          // sql = sql.replace(/\{(\w+)\}/g, "\" & $1 "  );

        const lines = this.sqlRaw.split(/\n/);
        // console.log(lines);
        lines.forEach( (s,i) => {
          if(i>0) sql = sql + '"'+lnEnd+'\n'+this.sqlVarName+' = '+ this.sqlVarName +' & \"';
          sql = sql + s.replace(/\{(\w+)\}/g, "\" & $1 & \""  );
        })
        sql = sql + '"'+lnEnd;
        this.sqlText = sql;
        

        $('#sqlOutSyntax').text(this.sqlRaw);

        $('#sqlOutSyntax').each(function(i, block) {
          hljs.highlightBlock(block);
        });

        // this.sqlSyntax = $('#sqlOutSyntax').html();
        // $('#sqlOutSyntax2').html($('#sqlOutSyntax').html());

      }
    }
  })
