from django.shortcuts import render
from django.views.generic import TemplateView
import json
from django.shortcuts import render_to_response


# Create your views here.
class HomePageView(TemplateView):

    # def get(self, request, **kwargs):
    #     return render(request, 'index.html', context=None)



    def get(self, request, **kwargs):
        directoryPath = 'cube_demo_system/static/json/'

        another_path = 'cube_demo_system/static/jsonData/'

        with open(directoryPath + 'RUS_UKR_geojson.json') as geoJsonFile:
            geoJsonData = json.load(geoJsonFile)

        with open(directoryPath + 'sorted_new_months.json') as sortedMonthFile:
            month_list = json.load(sortedMonthFile)

        with open(directoryPath + 'new_total_weights.json') as weightsFile:
            topicWeights = json.load(weightsFile)

        with open(another_path + 'fid_content_title_n.json') as titlefile:
            titles = json.load(titlefile)
        with open(another_path + 'locations.json') as locationfile:
            location = json.load(locationfile)
        with open(another_path + 'times.json') as timefile:
            times = json.load(timefile)
        with open(another_path + 'topics_new.json') as topicfile:
            topics = json.load(topicfile)
        with open(another_path + 'cell_key_sentence.json') as sentencefile:
            sentence = json.load(sentencefile)
        with open(another_path + 'image_attach.json') as imagefile:
            images = json.load(imagefile)
        with open(another_path + 'phrase_text_700_code.json') as phrasefile:
            phrase = json.load(phrasefile)

        
        
        

        topic_list = ['politics.international_relation',
                      'politics',
                      'economic.finance',
                      'politics.governance',
                      'politics.election',
                      'military.combat',
                      'military.terrorism',
                      'politics.justice',
                      'economic',
                      'military.weapons',
                      'military',
                      'ROOT',
                      'economic.tax',
                      'economic.trade',
                      'military.ceasefire']

        return render_to_response(
            'index.html', {
                'topicWeights': topicWeights,
                'monthList': month_list,
                'monthRange': len(month_list),
                'topicList': topic_list,
                'geoJsonData': geoJsonData,
                'titles': titles,
                'location':location,
                'times':times,
                'topics':topics,
                'sentence':sentence,
                'images':images,
                'phrase':phrase

            })