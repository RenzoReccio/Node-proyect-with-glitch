// client-side js
// run by the browser each time your view template is loaded

console.log("hello world :o");
var root = "https://right-perch-2guazbvzn.glitch.me";

$("#submit-restaurant").click(() => {
  var person = {
    name: $("#name").val(),
    tipo: $("#tipo").val(),
    platos: [$("#comida1").val(), $("#comida2").val()]
  };

  $.ajax({
    url: root + "/api/save",
    type: "POST",
    dataType: "json",
    data: person,
    success: function(data, textStatus, xhr) {
      console.log(data.result);
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log("Error in Operation");
    }
  });

  document.getElementById("name").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("comida1").value = "";
  document.getElementById("comida2").value = "";
});

$("#list-restaurant").click(() => {
  $.ajax({
    url: root + "/api/list",
    type: "POST",
    dataType: "json",
    success: function(data, textStatus, xhr) {
      console.log(data.response);
      var html_to_append = "";
      var cont = 0;
      jQuery.each(data.response, function(i, val) {
        // here you can do your magic
        html_to_append +=
          '<p id=' + '"list_' + cont +  '">' + val.name + "("+ val.tipo+"): " + val._id  + '</p>';
        cont++;
      });
       $("#list").html(html_to_append);
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log("Error in Operation");
    }
  });
});

$("#search-restaurant").click(() => {
  $.ajax({
    url: root + "/api/search",
    type: "POST",
    dataType: "json",
    data:{tipo: $("#tipo1").val()},
    success: function(data, textStatus, xhr) {
      console.log(data.response);
      var html_to_append = "";
      var cont=0;
      jQuery.each(data.response, function(i, val) {
        // here you can do your magic
        html_to_append +=
          '<p id=' + '"search_' + cont +  '">' + val.name + "(" + val.tipo + "): " + val._id  + '</p>';
        cont++;
      });
       $("#search").html(html_to_append);
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log("Error in Operation");
    }
  });
});

$("#remove-restaurant").click(() => {
  $.ajax({
    url: root + "/api/remove",
    type: "POST",
    dataType: "json",
    data:{id: $("#id1").val()},
    success: function(data, textStatus, xhr) {
      console.log(data.response);
      var  html_to_append =
          '<p id=' + 'remove_' +  '>' + data.response.name + "(" + data.response.tipo + "): " + data.response._id  + '</p>';
       $("#remove").html(html_to_append);
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log("Error in Operation");
    }
  });
});