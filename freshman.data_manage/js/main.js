/*!
  Inha University in Tashkent;
  Student name: Normurod Mamasoliev;
  Freshman year project 2016 August;
  working with data tables using jquery and php
*/



$(function(){
$("#danger").fadeOut(2900);//important

var retrieve={}; retrieve.counter=1; 
/* DataTable initializing */
retrieve.all=function(){
        var ar=[];
        $.ajax({
          type:"post",
          url:"config/connect.php",
          cache:false,
          async:false,
          data:{"retrieve":1},
          success:function(data){
              var d=JSON.parse(data);
              for(var i=d.result.length-1; i>=0;i--){
                var result=[d.result[i]['id'],retrieve.types(parseInt(d.result[i]['type'])),d.result[i]['series'],d.result[i]['id_number'],d.result[i]['comments']];
                ar.unshift(result);
              }
          }
        });
             
        $("#data_table").DataTable({
              "processing":true,
              "aaData":ar,
              "aoColumnDefs":[{
                  "sTitle":"№", 
                  "aTargets": [ "site_name" ],
                  "bVisible":true,
                  "aaSorting": [[ 1, 'desc' ]], 
                  "mRender": function ( a,b,c,d )  {
                    var index=parseInt(d.row)+1;
                    return '<span class="more">'+index+'</span>';
                }
              },
              {
                   "aTargets": [ 1 ]
                  , "bSortable": true
              },{
                "aTargets": [ 4 ]
                , "bSortable": false
                , "mRender": function ( a,b,c,d )  {
                  var ellipses="<b class='ellipses'>...</b>";
              return '<div class="accordion">'+c[4].substr(0,20)+(c[4].length>20?ellipses:'')+'<span class="comment_content" style="display:none"><p>'+c[4].substr(20)+'</p></span> '+(c[4].length>20?'<a title="Нажмите , чтобы прочитать больше" class="link btn btn-sm btn-default glyphicon glyphicon-plus" onclick=window.render_comments(this)></a>':'')+'</div>';
                }
              },{
                    "aTargets": [ 5 ]
                  , "bSortable": false,
                  "bVisible":(window.user_edit==false&&window.user_delete==false)?false:true
                  , "mRender": function ( a,b,c,d )  {
                    if(window.user_edit==true&&window.user_delete==true){
                      return  '<button  onclick="window.edit_row('+c[0]+","+d.row+')" type="button" id="dialog" data-toggle="modal" data-target="#modal" class="btn btn-sm btn-info edit"><span class="glyphicon glyphicon-edit"></span> Редактировать</button> '+
                      ' <button onclick="window.delete_row('+c[0]+","+d.row+')" class="btn btn-sm btn-danger delete"><span class="glyphicon glyphicon-trash"></span> Удалить</button>';
                    }
                    else if(window.user_edit==true&&window.user_delete==false){
                      return  '<button  onclick="window.edit_row('+c[0]+","+d.row+')" type="button" id="dialog" data-toggle="modal" data-target="#modal" class="btn btn-sm btn-info edit"><span class="glyphicon glyphicon-edit"></span> Редактировать</button> ';
                      
                    }else if(window.user_edit==false&&window.user_delete==true){
                        return  ' <button onclick="window.delete_row('+c[0]+","+d.row+')" class="btn btn-sm btn-danger delete"><span class="glyphicon glyphicon-trash"></span> Удалить</button>';
                    
                    }else{

                      return '<span>не допускается</span>';
                    }
                  }
              }]
        });
}

/* retrieve all types */
retrieve.types=function(type_id,type_name,type_all){
  var sv,s;
  $.ajax({
    type:"post",
    url:"config/connect.php",
    dataType:"json",
    cache:false,
    async:false,
    data:{
      "get_types":1,
    },
    success:function(d){
      for(var i=0; i<d.result.length; i++){
        if(type_id!="undefined"){
           if(d.result[i].id==type_id){
              sv=d.result[i].type_name;
           }          
        }else if(type_name!="undefined"){
          if(d.result[i].type_name==type_name){
            sv=d.result[i].id;
          }
        }else{
          $("#type").append("<option>"+d.result[i].type_name+"</option>");
          $("#edit-type").append("<option>"+d.result[i].type_name+"</option>");
        }

      }
    }
  });
  return sv;
}

/* important invokings */
retrieve.all(); retrieve.types("undefined","undefined","set all types");

/* add row DataTable  */
var table=$("#data_table").DataTable();
         $("#add_row_submit").click(function(){
            var arr=[$("#id").val(),retrieve.types("undefined",$("#type").val()),$("#series").val(),$("#id_number").val(),$("#comments").val()];
              var check_val=0;
            
              for(var i=1; i<arr.length; i++){
                if(arr[i].length==0){
                  check_val=1;
                }
              }
            if(check_val){
                alert("Заполните все поля!!!");
            }else{
              $.ajax({
                type:"post",
                url:"config/connect.php",
                async:false,
                cache:false,
                dataType: "json",
                data:{"addRow":1, ar:arr},
              }).done(function(data) {
                var n_arr=[data.result[0].id,retrieve.types(parseInt(data.result[0].type)),data.result[0].series,data.result[0].id_number,data.result[0].comments];
                table.row.add(n_arr).draw();
                table.order([1, 'desc']).draw();
                table.order([0, 'desc']).draw();
              });
                $("#add_row_submit").attr('data-dismiss',"modal");
            }
          });

/* delete row DataTable  */
window.delete_row=function(id_no,row_no){
      if(confirm("Вы уверены, чтобы удалить эти данные")){
          $.ajax({
            type:"POST",
            url:"config/connect.php",
            cache:false,
            data:{
                delete:1,
                id:id_no
            }
          }).done(function(data){
            Example.show("Успешно удалено!");
          });      
          table.row(row_no).remove().draw();
      }else{
          Example.show("Удаление отменено!");
      }
}

/* edit row DataTable  */
window.edit_row=function(id_no,row_no){
    var d = table.row(row_no).data();
    var old=table.row(row_no);
    var arr=[$("#edit-id").val(d[0]),$("#edit-type").val(d[1]),$("#edit-series").val(d[2]),$("#edit-id_number").val(d[3]),$("#edit-comments").val(d[4])];
    $("#edit-save").click(function(){
      var new_arr=[$("#edit-id").val(),retrieve.types("undefined",$("#edit-type").val()),$("#edit-series").val(),$("#edit-id_number").val(),$("#edit-comments").val()];
        $.ajax({
            type:"post",
            url:"config/connect.php",
            cache:false,
            async:false,
            dataType:"json",
            data:{
                "update":1,
                "values":new_arr
            }
        });
        old.data([$("#edit-id").val(),$("#edit-type").val(),$("#edit-series").val(),$("#edit-id_number").val(),$("#edit-comments").val()]).draw();
       
        $("#edit-save").attr('data-dismiss',"modal");
    });       
}

/* Show notifications */
var Example = (function() {
    "use strict";

    var elem=$("#notification-box"),
      hideHandler,
      that = {};

    that.init = function(options) {
      elem = $(options.selector);
    };

    that.show = function(text) {
      clearTimeout(hideHandler);
      elem.find("span").html(text);
      elem.delay(200).fadeIn().delay(1000).fadeOut();
    };
    return that;
}());

/* Show validations */
function validate(arg){
    $("#form #series").on('focus',function(){
       
    });
}

/* editing comments */
window.render_comments=function(e){
  if($(e).parent().find(".comment_content").css('display')=='none'){
      
      $(e).parent().find(".comment_content").css('display',"block");
      $(e).removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-minus");
      $(e).parent().find("b.ellipses").css('display',"none");
    }else{
      $(e).parent().find(".comment_content").css('display',"none")
      $(e).removeClass("glyphicon glyphicon-minus").addClass("glyphicon glyphicon-plus");
      $(e).parent().find("b.ellipses").css('display',"inline");
    }     
};

/* END */
});