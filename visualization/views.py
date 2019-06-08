from django.shortcuts import render_to_response
from django.views.generic import TemplateView
# from .models import Topic
from django.http import HttpResponse

import json
from datetime import datetime


# Create your views here.
class CountyView(TemplateView):

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
            'visualization/county.html', {
                'topicWeights': topicWeights,
                'monthList': month_list,
                'monthRange': len(month_list),
                'topicList': topic_list,
                'geoJsonData': geoJsonData,

            })


class CityView(TemplateView):

    def get(self, request, **kwargs):
        # topic = request.GET.get('topic')
        county = request.GET.get('county')
        date_period = request.GET.get('time')

        with open('cube_demo_system/static/geo/butte.geojson') as f:
            butte = json.load(f)

        with open('cube_demo_system/static/geo/butte-city.geojson') as f:
            butte_city = json.load(f)

        with open('cube_demo_system/static/json/cell_key_sentence_city.json') as keySentenceFile:
            summary = json.load(keySentenceFile)

        with open('cube_demo_system/static/json/image_city.json') as imageFile:
            image = json.load(imageFile)

        return render_to_response(
            'visualization/city.html', {
                # 'topic': topic,
                'county': county,
                'date_period': date_period,
                'butte': butte,
                'butte_city': butte_city,
                'summary': summary,
                'image': image
            })
