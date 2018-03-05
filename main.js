var appSQLTranslate = new Vue({
    el: '#md-form',
    data: {
      sqlVarName: 'SQLStr',
      preseveNewLine: true,
      sqlRaw: '',
      sqlText: ''
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
          console.log(s,i)
        })
        sql = sql + '"'+lnEnd;
        this.sqlText = sql;
        
        console.log('transforming sql...', this.sqlRaw)
      }
    }
  })

  /*


select * from users 
where instit_id = {I_ID}
and role = '{U_ROLE}'


  select * from users 
where instit_id = {I_ID}
*/