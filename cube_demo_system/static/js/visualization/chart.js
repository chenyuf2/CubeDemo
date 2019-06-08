function creategraph() {
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
            xobj.overrideMimeType("text/plain");
            xobj.open('GET', "static/jsonData/phrase_text_700_code.txt", true);
            xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
              }
            };
            xobj.send(null);
          }
          function loadJSON6(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'static/jsonData/cell_key_sentence.json', true);
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
        
        
          loadJSON(function(json) {
            loadJSON2(function(json2) {
                loadJSON3(function(json3) {
                    loadJSON4(function(json4) {
                        loadJSON5(function(json5) {
                          loadJSON6(function(json6) {
                            loadJSON7(function(json7) {

                   var titles = json;
                   var locations = json2;
                   var times = json3;
                   var topics = json4;
                   var ids = json5.split("\n");
                   var key_phrase = json6;
                   var image = json7;
                  
                   var input_time = document.getElementById("monthText").innerHTML;
                   var input_city = document.getElementById("cityinput").value;

                   //Define radio button list
                   var politics = ["justice", "election", "international_relation", "governance"];
                   var economy = ["trade", "finance", "tax", "welfare"];
                   var military = ["combat", "weapons", "terrorism", "ceasefire"];
                   var all_radio_button_ids = ["justice", "election", "international_relation", "governance","trade", "finance", "tax", "welfare","combat", "weapons", "terrorism", "ceasefire"];
                   var checked_button_id; // it stores which radio button is marked
                   for (var i = 0; i < all_radio_button_ids.length; i++) {
                       if (document.getElementById(all_radio_button_ids[i]).checked == true) {
                           checked_button_id = all_radio_button_ids[i];
                       }
                   }

                   
                   // Let's prepare data for the pie chart, currently the pie chart is selected only based on years
                   var piechart_dict={};
                   var piechart_news_dict={};
                   var times_id_list=[];
                   for (var i = 0; i < times.length; i++) {
                       if (times[i].length >= 7) {
                       if (times[i].substr(0,4) == input_time.substr(0,4)) {
                           times_id_list.push(ids[i]);
                       }
                   }
                }
                var locations_keys = Object.keys(locations);
                for (var i = 0; i < locations_keys.length; i++) {
                    var temp_key = locations_keys[i];
                    if (times_id_list.includes(temp_key)) {
                    if (locations[temp_key].includes(input_city)) {
                        var temp_topic = topics[i].split(".");
                       
                        if (temp_topic.length > 1) {
                        if (!(temp_topic[1] in piechart_dict)) {
                            piechart_dict[temp_topic[1]] = 1;
                            piechart_news_dict[temp_topic[1]]=[];
                            piechart_news_dict[temp_topic[1]].push(temp_key);
                        } else {
                            piechart_dict[temp_topic[1]] += 1;
                            piechart_news_dict[temp_topic[1]].push(temp_key);
                        }
                    }
                }
            }
        }
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
                      maintainAspectRatio: false,
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
                        position: 'right',
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
              console.log(points);
              var graph_index = points[0]._index;
              var topic_name = Object.keys(piechart_dict)[graph_index];
              var news_list = piechart_news_dict[topic_name]; // This stores the news id for each clicked category;
              var paper_detail_width = document.getElementById("paper_de").offsetWidth;
              var name2 = document.getElementById("name2");
              name2.innerHTML = "News Details of " + topic_name;
              for (var i = 0; i < news_list.length; i++) {
                  var temp_title = titles[news_list[i]]["title"];
                  var temp_text = titles[news_list[i]]["text"];
                  var target_id = news_list[i];
                  var very_important = document.getElementById("wholebody").offsetWidth;
                  paperdetail_html +=  '<a data-toggle="modal"  data-target="#myModal' + target_id + '" class="list-group-item list-group-item-action" style="border-radius:20px; border-style:none;width:'+(paper_detail_width*0.85).toString()+'"><p class="font-weight-bold" style="text-align: left; font-size:13px;">' +temp_title+'</p></a>'; 
                  modal_group_html += '<div class="modal fade" id="myModal' + target_id +'" role="dialog" ><div class="modal-dialog" style="margin-right:'+(very_important/2).toString()+'px!important;"><div class="modal-content" style="border-radius:40px!important; border: none; width:1000px!important;"><div class="modal-header" style="border:none!important;" ><div class="portfolio-modal-dialog bg-white" ><a class="close-button d-none d-md-block portfolio-modal-dismiss" data-dismiss="modal" style="color: #4e73df;!important;margin-left:920px;"><i class="fa fa-3x fa-times"></i></a><div class="container text-center" ><div class="row"> <div class="col-lg-8 mx-auto"><h2 class="text-secondary mb-0" style="text-align:left;">' +temp_title+'</h2><p class="mb-5" style="text-align:left; font-size:15px; margin-top:15px;">'+'</p><p class="mb-5" style="text-align:left; font-size:15px; margin-top:-30px;">'+'</p><p class="mb-5" style="font-weight:15px; margin-top:-30px!important; text-align:left;">'+'</p><hr class="star-dark mb-5" style="font-size:10px;"><p class="mb-5" style="text-align:left; text-indent: 30px;">'+ temp_text+'</p><a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" data-dismiss="modal"  style="color:#FFF!important;"> <i class="fa fa-close"></i>Close</a></div>   </div></div> </div> </div></div> </div></div>';
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
                //   var keywords_html = "";
                  var default_category = Object.keys(piechart_dict)[0];
                  var name2 = document.getElementById("name2");
              name2.innerHTML = "News Details of " + default_category.toUpperCase();
                  console.log(default_category);
                  var news_list = piechart_news_dict[default_category]; // This stores the news id for each clicked category;
                  var paper_detail_width = document.getElementById("paper_de").offsetWidth;
                  for (var i = 0; i < news_list.length; i++) {
                      var temp_title = titles[news_list[i]]["title"];
                      var temp_text = titles[news_list[i]]["text"];
                      var target_id = news_list[i];
                      var very_important = document.getElementById("wholebody").offsetWidth;
                      paperdetail_html +=  '<a data-toggle="modal"  data-target="#myModal' + target_id + '" class="list-group-item list-group-item-action" style="border-radius:20px; border-style:none;width:'+(paper_detail_width*0.85).toString()+'"><p class="font-weight-bold" style="text-align: left; font-size:13px;">' +temp_title+'</p></a>'; 
                      modal_group_html += '<div class="modal fade" id="myModal' + target_id +'" role="dialog" ><div class="modal-dialog" style="margin-right:'+(very_important/2).toString()+'px!important;"><div class="modal-content" style="border-radius:40px!important; border: none; width:1000px!important;"><div class="modal-header" style="border:none!important;" ><div class="portfolio-modal-dialog bg-white" ><a class="close-button d-none d-md-block portfolio-modal-dismiss" data-dismiss="modal" style="color: #4e73df;!important;margin-left:920px;"><i class="fa fa-3x fa-times"></i></a><div class="container text-center" ><div class="row"> <div class="col-lg-8 mx-auto"><h2 class="text-secondary mb-0" style="text-align:left;">' +temp_title+'</h2><p class="mb-5" style="text-align:left; font-size:15px; margin-top:15px;">'+'</p><p class="mb-5" style="text-align:left; font-size:15px; margin-top:-30px;">'+'</p><p class="mb-5" style="font-weight:15px; margin-top:-30px!important; text-align:left;">'+'</p><hr class="star-dark mb-5" style="font-size:10px;"><p class="mb-5" style="text-align:left; text-indent: 30px;">'+ temp_text+'</p><a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" data-dismiss="modal"  style="color:#FFF!important;"> <i class="fa fa-close"></i>Close</a></div>   </div></div> </div> </div></div> </div></div>';
                  }
                  paperdetail.innerHTML = paperdetail_html;
                  modal_group.innerHTML = modal_group_html;
                  //Then, let's build the line chart. but we need to do somethind for the data
                  var linechart_dict={};
                  var name;
                  if (politics.includes(checked_button_id) == true) {
                      linechart_dict["justice"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0, "September":0, "October":0, "November":0, "December":0};
                      linechart_dict["election"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                      linechart_dict["international_relation"]= {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                      linechart_dict["governance"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                      linechart_dict["miss"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                      name = "politics";
                  }
                  if (military.includes(checked_button_id)) {
                    linechart_dict["combat"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0, "September":0, "October":0, "November":0, "December":0};
                    linechart_dict["weapons"] = {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                    linechart_dict["terrorism"]= {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0,"September":0, "October":0, "November":0, "December":0};
                    linechart_dict["ceasefire"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                    linechart_dict["miss"] =  {"January":0, "Feburary":0, "March":0, "April":0, "May":0, "June":0, "July":0,"August":0, "September":0, "October":0, "November":0, "December":0};
                    name = "military";
                }
                  if (economy.includes(checked_button_id)) {
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
                          if (times[i].length >= 5) {
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
                  var colors= ['rgb(93,165,218,', 'rgb(250,164,58,', 'rgb(96,189,104,',"rgb(241,124,176,","rgb(178,118,178,","#DECF3F"];
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
        var easy_color = colors[i] + '0.2)';
        var hard_color = colors[i] + '1)';
        var temp_label = temp_label.toUpperCase();
        myLineChart.data.datasets.push(
          {
            label: temp_label,
            lineTension: 0.3,
            backgroundColor: easy_color,
            borderColor: hard_color,
            pointRadius: 3,
            pointBackgroundColor: hard_color,
            pointBorderColor: hard_color,
            pointHoverRadius: 3,
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
      var key_phrase_list = [];
      var key_sentence_list=[];
      var phrase_html = "";
      var category_name = "";
      if (military.includes(checked_button_id)) {
        category_name = "military";
      }
      if (economy.includes(checked_button_id)) {
        category_name = "economics";
      }
      if (politics.includes(checked_button_id)) {
        category_name = "politics";
      }
      var paper_detail_width = document.getElementById("paper_de").offsetWidth;
      for(var key in key_phrase){
        if(key.includes(category_name)){
          if(key.includes(input_time)){
            if(key.includes(input_city)){
              var content = key_phrase[key];
              console.log(content);
              for(var words in content){    
                var sentence = content[words];
                phrase_html += '<a class="list-group-item list-group-item-action flex-column align-items-start" style="border-radius:16px; width:'+(paper_detail_width*0.84).toString()+'px!important; border-style:none;"><li class="font-weight-bold text-primary" style="text-transform: uppercase;font-size:15px;">'+words.substr(0,3)+'<span class="text-dark" style="text-transform:upperclass;">'+words.substr(3,words.length)+'</span></li><li class="section-subheading text-muted font-weight-bold" style="font-size:smaller;font-family: "Droid Serif"; font-style: italic!important;">'+sentence+'</li></a>';

              }

            }
          }
        }
      }
      var keyword_sentence = document.getElementById("keywords");
      keyword_sentence.innerHTML = phrase_html;


      //Keywords is done, we need to do the image part
      var src = "";
      for(var t in image){
        if(t.includes(input_time) && src.length == 0){
          var location = image[t];
          for(var temp_city in location){
            if(temp_city.includes(input_city) && src.length == 0){
              var temp_topic = location[temp_city];
              for(var topic_name in temp_topic){
                if(topic_name.includes(checked_button_id) && src.length == 0){
                  src = temp_topic[topic_name];
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
      if(src.includes("jpg")){
        src = "static/jsonData/pics/pics/jpg/"+src;
      }
      else if (src.includes("png")){
        src = "static/jsonData/pics/pics/png/"+src;
      }
      console.log(src);
      var image_container = document.getElementById("image_container");
      var imagegroup = document.getElementById("imagegroup");
      if (src.length != 0) {
      image_container.innerHTML = "<img  src=" + src +" style='width:"+(imagegroup.offsetWidth*0.94).toString()+"px!important; border-radius:25px;'>";
    } else {
      var temp_src = "static/img/notfound.png";
      image_container.innerHTML = "<img  src=" + temp_src +" style='width:"+(imagegroup.offsetWidth*0.94).toString()+"px!important; border-radius:25px;'>";
    }
      var explain = document.getElementById("explain");
      if (src.length != 0) {
        explain.innerHTML = "<h3>Relevant Image</h3><p>This image is selected based on selections of user.</p>";
      } else {
        explain.innerHTML = "<h3>No Relevant Image Found</h3><p></p>";
      }
      



              
                    });
                });
            });
        });
      });
     });
   });

                  }
                