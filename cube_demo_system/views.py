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

        with open(directoryPath + 'RUS_UKR_geojson.json') as geoJsonFile:
            geoJsonData = json.load(geoJsonFile)

        with open(directoryPath + 'sorted_new_months.json') as sortedMonthFile:
            month_list = json.load(sortedMonthFile)

        with open(directoryPath + 'new_total_weights.json') as weightsFile:
            topicWeights = json.load(weightsFile)

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

            })