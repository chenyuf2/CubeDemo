var FILL_COLORS=["0", "23", "46", "69", "92", "115", "138", "161", "184", "207", "230","253"]
var TOPICS=['Death & Injury', 'Reconstruction', 'Property Loss']
var unitDate = 3
var topicList = ['justice', 'election', 'international_relation', 'governance', 'trade', 'finance', 'tax', 'welfare', 'combat', 'weapons', 'terrorism', 'ceasefire']
var prevPath = []



function getFilledColor(fillColor, percentage){
  return "hsl("+fillColor+", "+Math.min(100, (percentage*100).toFixed(2))+"%, 60%)"
}

function showModal(keyPhrases, location, topic, time) {
  var cellId = [topic, location, time].join('_')
	$('#modal_title').html("County: " + location + ",  Topic: " + TOPICS[parseInt(topic)] +", Date: "+time);
  $('#summary-content').html('<div class="row form-group"> <ul class="form-group" id="key-phrases-list"></ul></div>');
  if (images[topic][location] && images[topic][location][time])
    $('#fire_image').attr('src', "/static/" + images[topic][location][time]);
  var keyPhrase;
  if (keyPhrases[cellId]){
    var keys =Object.keys(keyPhrases[cellId])
    for (keyPhrase in keys){
      var $keyPhrase = $('<li class="key-phrase-li"> <span class="label label-primary">'+ keys[keyPhrase]+' </span></li>')
      $('#key-phrases-list').append($keyPhrase)
      var $keySentence = $('<div class="row form-group"><p>' + keyPhrases[cellId][keys[keyPhrase]]+ '</p></div>')
      $('#summary-content').append($keySentence)
    }
  }
	$('#county_modal').modal('show');
}

function updateMap(val, svg, range){
  var topicIndex = parseInt(document.querySelector('input[name="topic_filter"]:checked').value);
  var fillColor = FILL_COLORS[topicIndex];
  var dict = new Set();
  var cellWeight = new Map();
  // var min = 100;
  // var max = 0;
  var index;
  for(index in fireData){
      let i = fireData[index];
      if( i.time < val+range && i.time >= val && i.location.length && (topicIndex == 3 || i.topics[topicIndex] > 0.3 ) ){
        var locationIndex;
        for(locationIndex in i.location){
          let location = i.location[locationIndex]
          dict.add(location);

          if( !cellWeight.has(location)) {
            cellWeight.set(location, 0)
          }

          if (topicIndex == 3 )
              svg.getElementById(location).setAttribute("fill", "hsl(238, 100%, 80%)");
          else {
            //svg.getElementById(location).setAttribute("fill", getFilledColor(fillColor, {{ i.topics }}[topicIndex]));
            cellWeight.set(location, cellWeight.get(location) + i.topics[topicIndex])
            // if(cellWeight.get("{{ location }}") > max) max = cellWeight.get(location)
            // if (cellWeight.get("{{ location }}") < min ) min = cellWeight.get("{{ location }}")
          }
        }

      } else{
        // change the color back to default color
        for(index in i.location){
          let location = i.location[index]
          if (!dict.has(location) && location != "None"){
            svg.getElementById(location).setAttribute("fill", "#CCCCCC");
          }
        }

      }
  }
  // var range = max - min;
  if(topicIndex!=3){
      cellWeight.forEach(function(value, location, map){
        svg.getElementById(location).setAttribute("fill", getFilledColor(fillColor, value));
      })
    }
}


function updateDate(originDate, id, val, range=unitDate-1){
  var minDate = new Date(originDate.toDateString())
  minDate.setDate(minDate.getDate() + val);
  var minDateString = minDate.toDateString()
  minDate.setDate(minDate.getDate() + range);
  document.getElementById(id).innerHTML= minDateString + " - " + minDate.toDateString();
}

function updateTimeInput(range, dateRange, minDate) {
    var val = document.getElementById("timeline_slider").value;
    var svg = document.getElementById("map_current").contentDocument;
    var svg_prev = document.getElementById("map_prev").contentDocument;
    var svg_next = document.getElementById("map_next").contentDocument;
    if (range == unitDate)
      document.getElementById("show_all_checkbox").checked=false;
    var dict = new Set();
    var minDate = new Date(minDate);
    val = parseInt(val)
    updateDate(minDate, "selectedDate_current", val, Math.min(range-1, Math.max(0, dateRange-val-1)));
    updateMap(val, svg, range);
    if(val>0){
      updateMap(val-range, svg_prev, range);
      updateDate(minDate, "selectedDate_prev", val-range);
    }
    else{
      updateMap(-1, svg_prev,0);
      document.getElementById("selectedDate_prev").innerHTML = "";
    }
    if (val + range< dateRange && range != dateRange){
      updateMap(val+range, svg_next, range);
      updateDate(minDate, "selectedDate_next", val+range, Math.min(range, dateRange - val - 1 - range));
    }
    else{
      updateMap(-1, svg_next,0);
      document.getElementById("selectedDate_next").innerHTML = "";
    }
}


function switchShowAll(dateRange, minDate){
  var chk=document.getElementById("show_all_checkbox").checked;
  if (chk){
    document.getElementById("timeline_slider").value = "0";
    updateTimeInput(dateRange, dateRange, minDate);
  }
  else {
    updateTimeInput(unitDate, dateRange, minDate);
  }
}


















function newSwitchShowAll(){
    let month = document.getElementById("monthText").innerHTML;
    let topicIndex = parseInt(document.querySelector('input[name="topic_filter"]:checked').value);
    $.ajax({
       url:clearFill(),
       success:function(){
           update(topicIndex, month);
        }
    })
}



function update(topicIndex, month) {
  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'cube_demo_system/static/json/total_weights.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);

  }
  loadJSON(function(json) {
    var topicWeights = json;
    console.log(topicWeights);
    if (month === '')
        month = 'all';

    let topic = topicList[topicIndex]
    let fillColor = FILL_COLORS[topicIndex];
    let keyArray = Object.keys(topicWeights[month][topic]);
    prevPath = keyArray
    console.log(prevPath);
    let maxVal = arrayMax(Object.values(topicWeights[month][topic]));

    for (let i = 0; i < keyArray.length; i++)
        topicWeights[month][topic][keyArray[i]] = topicWeights[month][topic][keyArray[i]]/maxVal;

    let map = document.getElementById("russia_ukraine_map");
    let svgDoc = map.contentDocument;

    for (let i = 0; i < keyArray.length; i++) {
        let county = svgDoc.getElementById(keyArray[i]);
        county.style.fill = "hsl("+ fillColor + ", "+Math.min(100, 100*topicWeights[month][topic][keyArray[i]].toFixed(2))+"%, 67.5%)";
    }
  });
}


function arrayMax(arr) {
  let len = arr.length, max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
};


function clearFill() {
    let map = document.getElementById("russia_ukraine_map");
    let svgDoc = map.contentDocument;
    for (let i = 0; i < prevPath.length; i++) {
        let county = svgDoc.getElementById(prevPath[i]);
        county.style.removeProperty("fill");
    }
}