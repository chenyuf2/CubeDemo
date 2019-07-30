function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', "static/json/table.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}
loadJSON(function(json) {
  console.log(json);
  var table_title = document.getElementById("table_title");
  console.log(table_title.innerHTML);
  var table_content = document.getElementById("table_content");
  var table_title_html="";
  var table_content_html="";
  table_title_html += "<tr>";
  for (var i = 0; i < json["0"].length; i++) {
    table_title_html+="<th>" + json["0"][i]+"</th>";
  }
  table_title_html += "</tr>";
  table_title.innerHTML = table_title_html;

  for (var i = 1; i < 20; i++) {
    var temp_list = json[i.toString()];
    table_content_html += "<tr>";
    for (var j = 0; j < temp_list.length; j++) {
      if (i < 4) {
        table_content_html += "<td style='color:#BD5D38;'>"+temp_list[j]+"</td>";
      } else {
      table_content_html += "<td>"+temp_list[j]+"</td>";
      }
    }
    table_content_html += "</tr>";
  }
  table_content.innerHTML = table_content_html;
});
function creategraph(city_name) {
    function loadJSON(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', "static/jsonData/fid_content_title_n.json", true);
            xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(JSON.parse(xobj.responseText));
              }
            };
            xobj.send(null);
          }
          function loadJSON2(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', "static/jsonData/locations.json", true);
            xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(JSON.parse(xobj.responseText));
              }
            };
            xobj.send(null);
          }
          function loadJSON3(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', "static/jsonData/times.json", true);
            xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(JSON.parse(xobj.responseText));
              }
            };
            xobj.send(null);
          }
          function loadJSON4(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', "static/jsonData/topics_new.json", true);
            xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(JSON.parse(xobj.responseText));
              }
            };
            xobj.send(null);
          }
          function loadJSON5(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'static/jsonData/phrase_text_700_code.json', true);
            xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(JSON.parse(xobj.responseText));
              }
            };
            xobj.send(null);
          }
          function loadJSON6(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'static/jsonData/phrase.json', true);
            xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(JSON.parse(xobj.responseText));
              }
            };
            xobj.send(null);
          }
          function loadJSON7(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'static/jsonData/image_attach.json', true);
            xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(JSON.parse(xobj.responseText));
              }
            };
            xobj.send(null);
          }
          function loadJSON8(callback) {
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
            loadJSON2(function(json2) {
                loadJSON3(function(json3) {
                    loadJSON4(function(json4) {
                        loadJSON5(function(json5) {
                          loadJSON6(function(json6) {
                            loadJSON7(function(json7) {
                                loadJSON8(function(json8) {
                  console.log(Object.keys(json).length);
                   var titles = json;
                   var locations = json2;
                   var times = json3;
                   var topics = json4;
                   var ids = json5;
                   var key_phrase = json6;
                   var image = json7;

                   var input_time = document.getElementById("monthText").innerHTML;
                   var input_city = city_name;
                   var current_input_city = document.getElementById("current_input_city");
                   current_input_city.innerHTML = "Current: " + input_city.toString();
                   var hidden_input_city = document.getElementById("hidden_input_city");
                   hidden_input_city.innerHTML = input_city;
                   //Define radio button list
                   var politics = ["justice", "election", "international_relation", "governance"];
                   var economy = ["trade", "finance", "tax", "welfare"];
                   var military = ["combat", "weapons", "terrorism", "ceasefire"];
                   var all_radio_button_ids = ["politics.justice", "politics.election", "politics.international_relation", "politics.governance","economic.trade", "economic.finance", "economic.tax", "economic.welfare","military.combat", "military.weapons", "military.terrorism", "military.ceasefire"];
                   var checked_button_id; // it stores which radio button is marked
                   for (var i = 0; i < all_radio_button_ids.length; i++) {
                       if (document.getElementById(all_radio_button_ids[i]).checked == true) {
                           checked_button_id = all_radio_button_ids[i].split(".")[1];
                       }
                   }
                   if (document.getElementById("economic").checked == true) {
                     checked_button_id = "economic";
                   }
                   if (document.getElementById("military").checked == true) {
                     checked_button_id = "military";
                   }
                   if (document.getElementById("politics").checked == true) {
                     checked_button_id = "politics";
                   }
                   var categoryinput = document.getElementById("categoryinput");
                   categoryinput.innerHTML = "Category: "+checked_button_id;
                   var importanttimeinput = document.getElementById("importanttimeinput");
                   importanttimeinput.innerHTML = "Time: "+ input_time;

                   // Let's prepare data for the pie chart, currently the pie chart is selected only based on years
                   var piechart_dict={};
                   var piechart_news_dict={};
                   var times_id_list=[];
                   for (var i = 0; i < times.length; i++) {
                       if (times[i].length >= 5) {

                       if (times[i].substr(0,7) == input_time) {
                           times_id_list.push(ids[i]);
                       }
                   }
                }

                var locations_keys = Object.keys(locations);
                // console.log(times_id_list);
                for (var i = 0; i < ids.length; i++) {
                  if (times[i].length > 5) {
                    var temptime = times[i].substr(0,7);
                    if (temptime == input_time) {
                    if (ids[i] in locations) {
                      temp_list = locations[ids[i]];
                      if (temp_list.includes(city_name)) {
                        var temp_topic = topics[i].split(".");
                        if (temp_topic.length > 1) {
                                   if (!(temp_topic[1] in piechart_dict)) {
                                       piechart_dict[temp_topic[1]] = 1;
                                       piechart_news_dict[temp_topic[1]]=[];
                                       piechart_news_dict[temp_topic[1]].push(ids[i]);
                                   } else {
                                       piechart_dict[temp_topic[1]] += 1;
                                       piechart_news_dict[temp_topic[1]].push(ids[i]);
                                   }
                               } else {
                                 if (!(temp_topic[0] in piechart_dict)) {
                                     piechart_dict[temp_topic[0]] = 1;
                                     piechart_news_dict[temp_topic[0]]=[];
                                     piechart_news_dict[temp_topic[0]].push(ids[i]);
                                 } else {
                                     piechart_dict[temp_topic[0]] += 1;
                                     piechart_news_dict[temp_topic[0]].push(ids[i]);
                                 }

                               }
                      }
                      // for (var i = 0; i < temp_list.length; i++) {
                      }
                      }
                    }
                  }
                    // var temp_key = locations_keys[i];
            //         if (times_id_list.includes(temp_key)) {
            //           // console.log(locations[temp_key]);
            //           console.log(temp_key);
            //         if (locations[temp_key].includes(input_city)) {
            //             var temp_topic = topics[i].split(".");
            //             console.log(temp_topic);
            //             if (temp_topic.length > 1) {
            //             if (!(temp_topic[1] in piechart_dict)) {
            //                 piechart_dict[temp_topic[1]] = 1;
            //                 piechart_news_dict[temp_topic[1]]=[];
            //                 piechart_news_dict[temp_topic[1]].push(temp_key);
            //             } else {
            //                 piechart_dict[temp_topic[1]] += 1;
            //                 piechart_news_dict[temp_topic[1]].push(temp_key);
            //             }
            //         } else {
            //           if (!(temp_topic[0] in piechart_dict)) {
            //               piechart_dict[temp_topic[0]] = 1;
            //               piechart_news_dict[temp_topic[0]]=[];
            //               piechart_news_dict[temp_topic[0]].push(temp_key);
            //           } else {
            //               piechart_dict[temp_topic[0]] += 1;
            //               piechart_news_dict[temp_topic[0]].push(temp_key);
            //           }
            //
            //         }
            //     }
            // }
        //   }
        // }
        console.log(piechart_dict);
        // console.log(piechart_news_dict);

                // Now, piechart_dict is already be completed, we need to draw the graph;
                var piechartContainer = document.getElementById("piechartContainer");
                piechartContainer.innerHTML='<canvas id="myAreaChart"></canvas>';

                // Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
                  Chart.defaults.global.defaultFontColor = '#000000';

                  var piechart_label = Object.keys(piechart_dict);
                  for (var i = 0; i < piechart_label.length; i++) {
                    piechart_label[i] = piechart_label[i].toUpperCase();
                  }

                  // Pie Chart Example
                  var ctx = document.getElementById("myAreaChart");
                  var myPieChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                      labels: piechart_label,
                      datasets: [{
                        data: Object.values(piechart_dict),
                        backgroundColor: ['#5DA5DA', '#FAA43A', '#60BD68',"#F17CB0","#B276B2","#DECF3F","#F15854", "#4D4D4D", "#B2912F", "#ffbaba", "#6497b1", "#d896ff"],
                        hoverBackgroundColor: ['#5DA5DA', '#FAA43A', '#60BD68',"#F17CB0","#B276B2","#DECF3F","#F15854","#4D4D4D", "#B2912F", "#ffbaba", "#6497b1", "#d896ff"],
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                      }],
                    },
                    options: {
                      maintainAspectRatio:false,
                      tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 12,
                      },
                      legend: {
                        position: 'bottom',
                        fontWeight: 'bolder',
                        labels: {
                            usePointStyle:true,
                          }
                        // display:false,
                      },
                      cutoutPercentage: 70,
                      'onClick' : function (evt) {
            //   var keywords = document.getElementById("keywords");
              var paperdetail = document.getElementById("paperdetail");
              var paperdetail_html = "";
              var modal_group = document.getElementById("modal_group");
              var modal_group_html = "";
            //   var keywords_html = "";
              var points = myPieChart.getElementsAtEvent(evt);
              // console.log(points);
              var graph_index = points[0]._index;
              var topic_name = Object.keys(piechart_dict)[graph_index];
              var news_list = [];
              if (Object.keys(piechart_dict).length!= 0) {
              news_list = piechart_news_dict[topic_name];
            }  else {
              news_list = [];
            }// This stores the news id for each clicked category;
              var paper_detail_width = document.getElementById("cool").offsetWidth;
              var name2 = document.getElementById("name2");
              name2.innerHTML = "News Details of " + topic_name;
              for (var i = 0; i < news_list.length; i++) {
                  var temp_title = titles[news_list[i]]["title"];
                  var temp_text = titles[news_list[i]]["text"];
                  var target_id = news_list[i];
                  var very_important = document.getElementById("wholebody").offsetWidth;
                  console.log(paper_detail_width);
                  paperdetail_html +=  '<a data-toggle="modal"  data-target="#myModal' + target_id + '" class="list-group-item list-group-item-action" style="border-radius:20px; border-style:none;width:'+(paper_detail_width).toString()+'px;"><p class="font-weight-bold" style="text-align: center; font-weight:bold; font-size:21px;">' +temp_title+'</p></a>';
                  modal_group_html +=  '<div class="portfolio-modal modal fade" id="myModal'+target_id+'" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="close-modal" data-dismiss="modal"><div class="lr"><div class="rl"></div></div></div><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2"><div class="modal-body"><h2  style="text-align:left;">'+temp_title+'</h2><p  style="text-align:left;">'+temp_text+'</p><button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Close Project</button></div></div></div></div></div></div></div>';;
              }
              paperdetail.innerHTML = paperdetail_html;
              modal_group.innerHTML = modal_group_html;


                         }
                    },
                  });
                   //Even the pie chart is built, we then set the default value for news detail. We don't want it to be empty
                   var paperdetail = document.getElementById("paperdetail");
                  var paperdetail_html = "";
                  var modal_group = document.getElementById("modal_group");
                  var modal_group_html = "";
                  paperdetail.innerHTML = "";
                  modal_group.innerHTML = "";
                //   var keywords_html = "";
                var default_category="";
                if (Object.keys(piechart_dict).length != 0) {
                  default_category = Object.keys(piechart_dict)[0];
                }
                  var name2 = document.getElementById("name2");
              name2.innerHTML = "News Details of " + default_category;
                  // console.log(default_category);
                  var news_list=[];
                  if (default_category != "") {
                  news_list = piechart_news_dict[default_category];
                  }// This stores the news id for each clicked category;
                  var paper_detail_width = document.getElementById("cool").offsetWidth;
                  for (var i = 0; i < news_list.length; i++) {
                      var temp_title = titles[news_list[i]]["title"];
                      var temp_text = titles[news_list[i]]["text"];
                      var target_id = news_list[i];
                      var very_important = document.getElementById("wholebody").offsetWidth;
                      paperdetail_html +=  '<a data-toggle="modal"  data-target="#myModal' + target_id + '" class="list-group-item list-group-item-action" style="border-radius:20px; border-style:none;width:'+(paper_detail_width).toString()+'px;"><p class="font-weight-bold" style="text-align: center; font-weight:bold; font-size:21px;">' +temp_title+'</p></a>';
                      modal_group_html +=  '<div class="portfolio-modal modal fade" id="myModal'+target_id+'" tabindex="-1" role="dialog" aria-hidden="true" style="overscroll-behavior: contain!important;"><div class="modal-dialog"><div class="modal-content"><div class="close-modal" data-dismiss="modal"><div class="lr"><div class="rl"></div></div></div><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2"><div class="modal-body"><h2 style="text-align:left;">'+temp_title+'</h2><p  style="text-align:left;">'+temp_text+'</p><button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Close Project</button></div></div></div></div></div></div></div>';
                  }
                  paperdetail.innerHTML = paperdetail_html;
                  modal_group.innerHTML = modal_group_html;









                  //Then, let's build the line chart. but we need to do somethind for the data
                  var linechart_dict={};
                  var name;
                  if (politics.includes(checked_button_id) == true || checked_button_id == "politics") {
                      linechart_dict["justice"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0, "September":0, "October":0, "November":0, "December":0};
                      linechart_dict["election"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                      linechart_dict["international_relation"]= {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                      linechart_dict["governance"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                      linechart_dict["miss"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                      name = "politics";
                  }
                  if (military.includes(checked_button_id) == true || checked_button_id == "military") {
                    linechart_dict["combat"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0, "September":0, "October":0, "November":0, "December":0};
                    linechart_dict["weapons"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                    linechart_dict["terrorism"]= {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                    linechart_dict["ceasefire"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                    linechart_dict["miss"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                    name = "military";
                }
                  if (economy.includes(checked_button_id)==true || checked_button_id == "economic") {
                    linechart_dict["trade"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0, "September":0, "October":0, "November":0, "December":0};
                    linechart_dict["finance"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                    linechart_dict["tax"]= {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                    linechart_dict["welfare"] =   {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                    linechart_dict["miss"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                    name = "economic";
                }
                  var location_list_ids = [];
                  var month_dict={"01":"January", "02":"Feburary", "03":"March", "04":"April", "05":"May", "06":"June","07":"July","08":"August", "09":"September", "10":"October", "11":"November", "12":"December"};
                  for (var key in locations) {
                      var temp_location = locations[key];
                      if (temp_location.includes(input_city)) {
                          location_list_ids.push(key);
                      }
                  }

                  for (var i = 0; i < ids.length; i++) {
                      if (location_list_ids.includes(ids[i])) {
                          if (times[i].length >= 5 && times[i].includes(input_time.substr(0,4))) {
                          var temp_time = times[i].split("-")[1];

                          var temp_month = month_dict[temp_time];
                          var temp_topic = topics[i].split(".");

                          if (temp_topic.length == 2) {
                              if (temp_topic[1] in linechart_dict) {
                              linechart_dict[temp_topic[1]][temp_month] += 1;
                              }
                          } else {
                              if (temp_topic == name) {
                            linechart_dict["miss"][temp_month] += 1;
                        }
                          }
                        }
                      }
                  }
                  //Now, the data is ready, we begin to build line chart
                  // helpful color to build line chart

                 //Codes for building line chart
                  var colors= ['rgb(93,165,218,', 'rgb(250,164,58,', 'rgb(96,189,104,',"rgb(241,124,176,","rgb(219,50,54,","#DECF3F"];
                  var linechartContainer = document.getElementById("linechartContainer");
                linechartContainer.innerHTML='<canvas id="myLineChart"></canvas>';
                var ctx1 = document.getElementById("myLineChart");
      var myLineChart = new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 12
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                padding: 10
                // Include a dollar sign in the ticks
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            position: 'bottom',
                        labels: {
                            usePointStyle:true,
                          },
          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10
          }
        }
      });
      var labels = Object.keys(linechart_dict);
      for (var i = 0; i < 5; i++) {
        var temp_label = labels[i];
        var temp_data = Object.values(linechart_dict[temp_label]);
        var easy_color = colors[i] + '0.8)';
        var hard_color = colors[i] + '0.8)';
        var temp_label = temp_label.toUpperCase();
        myLineChart.data.datasets.push(
          {
            label: temp_label,
            lineTension: 0.3,
            backgroundColor: easy_color,
            borderColor: hard_color,
            pointRadius: 0,
            pointBackgroundColor: hard_color,
            pointBorderColor: hard_color,
            pointHoverRadius: 3,
            borderColor:"rgb(0,0,0,0)",
            pointHoverBackgroundColor: hard_color,
            pointHoverBorderColor: hard_color,
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: temp_data,
          }
        );
        myLineChart.update();
      }


      //Next part is the keywords and phrases and image
      var keyword_sentence = document.getElementById("keywords");
      keyword_sentence.innerHTML = "";
      // console.log(key_phrase);
      var key_phrase_list = [];
      var key_sentence_list=[];
      var phrase_html = "";
      var category_name = "";
      if (military.includes(checked_button_id) || checked_button_id == "military") {
        category_name = "military";
      }
      if (economy.includes(checked_button_id) || checked_button_id == "economic") {
        category_name = "economics";
      }
      if (politics.includes(checked_button_id) || checked_button_id == "politics") {
        category_name = "politics";
      }

      var paper_detail_width = document.getElementById("keywords").offsetWidth;
      for(var key in key_phrase){
        if (checked_button_id == "politics" || checked_button_id == "military" || checked_button_id == "economic") {
          checked_button_id = checked_button_id+".";
        }
        if(key.includes(checked_button_id)){
          if(key.includes(input_time)){
            if(key.includes(input_city)){
              var content = key_phrase[key];
              // console.log(content);
              // for(var words in content){
              //   if (words != "coverage") {
              var temp_phrase = content["key_phrases"];
              var temp_sentences = content["key_sentences"];
              var words = "";
              var sentence = "";
              for (var i = 0; i < temp_phrase.length; i++) {
                words += temp_phrase[i] + "<br>";
              }
              for (var i = 0; i < temp_sentences.length; i++) {
                sentence += temp_sentences[i] + "<br>";
              }
                phrase_html += '<a class="list-group-item bg-light-gray list-group-item-action flex-column align-items-start" style="border-radius:16px; width:'+(paper_detail_width).toString()+'px!important; border-style:none;"><li class="font-weight-bold text-primary" style="text-transform: uppercase;font-size:21px;">'+words.substr(0,3)+'<span class="text-dark" style="text-transform:upperclass;">'+words.substr(3,words.length)+'</span></li><li class="section-subheading text-muted font-weight-bold" style="font-size:17px;font-family: "Droid Serif"; font-style: italic!important;">'+sentence+'</li></a>';

              break;

            }
          }
        }
      }
      keyword_sentence.innerHTML = phrase_html;
    //  console.log(key_phrase["politics.governance_SEP_Donets'k_SEP_2014-05"]);

      //Keywords is done, we need to do the image part
      var usefulid = ""
      var all_radio_button_names = ["military", "politics", "economic","politics.justice", "politics.election", "politics.international_relation", "politics.governance","economic.trade", "economic.finance", "economic.tax", "economic.welfare","military.combat", "military.weapons", "military.terrorism", "military.ceasefire"];
      for (var i = 0; i < all_radio_button_names.length; i++) {
        if (document.getElementById(all_radio_button_names[i]).checked == true) {
            usefulid = all_radio_button_names[i];
        }
      }

      var src_list = [];

      console.log(checked_button_id);
      console.log(input_time);
      for(var t in image){
        if(t.includes(input_time) && src_list.length == 0){
          var location = image[t];
          for(var temp_city in location){
            if(temp_city.includes(input_city) && src_list.length == 0){
              var temp_topic = location[temp_city];
              console.log(temp_topic);
              for(var topic_name in temp_topic){
                if(topic_name == usefulid && src_list.length == 0){
                  src_list = temp_topic[topic_name];
                  break;
                }
              }
            }
            }
          }
        }



      //Please keep this code, probably these codes will be used later.
      // if(src.length == 0){
      //   for(var location in image[ROOT]){
      //     if(location.includes(city)){
      //       var l3 = image[ROOT][location];
      //       for(var t in l3){
      //         if(t.includes(time)){
      //           src = l3[t];
      //         }
      //       }
      //     }
      //   }
      // }
      //Complete the src of image, then put innerhtml in the index
      // console.log(src);
      for (var i = 0; i < src_list.length; i++) {
        var src = src_list[i];
      if(src.includes("jpg")){
        src_list[i] = "static/jsonData/pics/pics/jpg/"+src;
      }
      else if (src.includes("png")){
        src_list[i] = "static/jsonData/pics/pics/png/"+src;
      }
    }
      // console.log(src);
      var image_container = document.getElementById("imagelist");
      var imagegroup = document.getElementById("imagegroup");
      var image_container_html = "";
      console.log(src_list);
      if (src_list.length != []) {
        for (var i = 0; i < src_list.length; i++) {
          var src = src_list[i];
          if (i == 0) {
            if (src=="N/A_IMG") {
              src = "static/img/notfound.png";
              image_container_html += "<img class='mySlides'  id = 'actual' src=" + src +" style='height:auto; width:"+(imagegroup.offsetWidth*0.95).toString()+"px!important; border-radius:25px;'>";
            } else {
image_container_html += "<img class='mySlides'  id = 'actual' src=" + src +" style='height:auto; width:"+(imagegroup.offsetWidth*0.95).toString()+"px!important; border-radius:25px;'>";
}
} else {
    image_container_html += "<img class='mySlides'  id = 'actual' src=" + src +" style='height:auto; display:none;width:"+(imagegroup.offsetWidth*0.95).toString()+"px!important; border-radius:25px;'>";
}

    }
    } else {

      var temp_src = "static/img/notfound.png";
      image_container_html+= "<img  class='mySlides' id='actual' src=" + temp_src +" style='height:auto; width:"+(imagegroup.offsetWidth*0.95).toString()+"px!important; border-radius:25px;'>";
    }
    image_container.innerHTML = image_container_html;

var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
if (src_list.length >= 2) {
  button1.style.visibility = "visible";
  button2.style.visibility="visible";
} else {
  button1.style.visibility = "hidden";
  button2.style.visibility="hidden";
}

      // var explain = document.getElementById("explain");
      // if (src.length != 0) {
      //   explain.innerHTML = "<h3>Relevant Image</h3><p>This image is selected based on selections of user.</p>";
      // } else {
      //   explain.innerHTML = "<h3>No Relevant Image Found</h3><p></p>";
      // }
      // var actual = document.getElementById("actual");
      // var overlay = document.getElementById("overlay");
      // overlay.style.width = actual.offsetWidth.toString() + "px";
      // var search = document.getElementById("search");
      // search.value= "";



      var input_time = document.getElementById("monthText").innerHTML;
      var all_ids = ["politics", "military","economic","politics.justice", "politics.election", "politics.international_relation", "politics.governance","economic.trade", "economic.finance", "economic.tax", "economic.welfare","military.combat", "military.weapons", "military.terrorism", "military.ceasefire"];

      for (var i = 0; i < all_ids.length; i++) {
        var temp = document.getElementById(all_ids[i] + "1");
        var num = 0;
        if (city_name in json8[input_time]) {
          if (all_ids[i] in json8[input_time][city_name]) {
         num = json8[input_time][city_name][all_ids[i]];
       }
      }
        if (all_ids[i] == "politics" || all_ids[i] == "military" || all_ids[i] == "economic") {
          temp.innerHTML = all_ids[i] + " (" + num.toString() + ")";
        } else {
          temp.innerHTML = all_ids[i].split(".")[1] + " (" + num.toString() +")";
        }
      }
                      });
                    });
                });
            });
        });
      });
     });
   });

                  }
