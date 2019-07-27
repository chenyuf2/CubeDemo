function mousetop(id) {
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', "static/json/cell_doc_num.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}
loadJSON(function(json) {
  var input_city = document.getElementById("current_input_city").innerHTML;
  var input_city = input_city.split(": ")[1];
  var input_time = document.getElementById("monthText").innerHTML;
  var num = json[input_time][input_city][id];
});
}
