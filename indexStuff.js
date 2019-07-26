var company = "bikeshopseo";
var key = "twp_7ABvLLanTpg78AAmwHnGvX8BeoU6";
var j =  $.ajax({
	url: 'https://' + company + '.teamwork.com/projects.json?catId=13632,13634,136233,13630,13631',
	headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},success: function(data) {
  console.log(data);
  console.log("data.projects.length is: " +data.projects.length)
  for (i=0; i< data.projects.length; i++){
  var d = new Date();
  var n = d.getMonth();
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = months[n];
  var item = data.projects[i].id;
  var categoryId = data.projects[i].category.id;

// console.log(item);
// console.log(categoryId);
  $.ajax({
  	url: 'https://' + company + '.teamwork.com/projects/' + item + '/roles.json',
  	headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},success: function(data1) {
      let dataRoles = data1.roles

      if (dataRoles) {
        var seoVal = "SEO";
        var indexSEO = dataRoles.findIndex(item => item.name === seoVal)

        var devVal = "SEO";
        var indexDev = dataRoles.findIndex(item => item.name === devVal)

        var ppcVal = "PPC";
        var indexPPC = dataRoles.findIndex(item => item.name === ppcVal)

        var pmVal = "PM";
        var indexPM = dataRoles.findIndex(item => item.name === pmVal)

        var seo = dataRoles[indexSEO].users[0].id
        console.log("seo is: " + seo);
        var dev = dataRoles[indexDev].users[0].id
        console.log("dev is: " + dev);
        var ppc = dataRoles[indexPPC].users[0].id
        console.log("ppc is: " + ppc);
        var pm = dataRoles[indexPM].users[0].id
        console.log("pm is: " + pm);

        if(categoryId == 13634){var catId = "713735";} //xs
        if(categoryId == 13630){var  catId = 713732;} //s
        if(categoryId == 13631){var  catId = 749551;} //m
        if(categoryId == 13632){var  catId = 1179505;} //lg
        if(categoryId == 13633){var  catId = 1179542;} //xl

        var jason = JSON.stringify({
          "todo-list": {
            "name": month + " SEO Tasks",
            "todo-list-template-id": catId,
            "todo-list-template-assignments": {
               "SEO": seo,
               "DEV": dev,
               "PM": pm,
               "PPC": ppc
             }
           }
         });
         console.log('jason: ', jason);

         $.ajax({
        	url: 'https://' + company + '.teamwork.com/projects/'+ item +'/tasklists.json',
          type: 'Post',
        	headers: {
            "Authorization": "BASIC " + window.btoa(key + ":xxx"),
            "Content-Type" : "application-json"
          },
        	data: jason
         }); // end of post
      } else {
        return 'loading'
      }
    }});
  }
}
});
