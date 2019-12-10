from pyAudioAnalysis import audioSegmentation as aS
import sys
import wave
import contextlib
import os
from flask import jsonify

def classify_file( audiofile, model ):

    with contextlib.closing(wave.open(audiofile,'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)
        print(duration)

    try:
        aS.mtFileClassification(audiofile, model,"svm", True)
    except TypeError:
        print("TypeError")
        
    [flagsInd, classesAll, acc, CM] = aS.mtFileClassification(audiofile, model,"svm")
    print( flagsInd )
    print( classesAll )
    print( acc )
    print( CM )

    flag_len = len(flagsInd)
    segment = duration / flag_len

    series = []

    for index in range(flag_len):
        
        #series[0] = { "category" : classesAll[int(flagsInd[index])], time[segment * index] } }
        print( str( "{ category: '" + classesAll[int(flagsInd[index])] ) + "', time: " + str(segment * index) + " }," )

def anthro_model():
    for filename in os.listdir('model/anthro'):
        modelfile = 'model/anthro/' + filename
        return modelfile

def bio_model():
    for filename in os.listdir('model/bio'):
        modelfile = 'model/bio/' + filename
        return modelfile

def geo_model():
    for filename in os.listdir('model/geo'):
        modelfile = 'model/geo/' + filename
        return modelfile

def runScript():
    print("hello :(")

    for filename in os.listdir('audio'):
        audiofile = 'audio/' + filename

    classify_file(audiofile, anthro_model() )
    classify_file(audiofile, bio_model() )
    classify_file(audiofile, geo_model() )

    result = [
      {
        'name': 'Anthrophony',
        'color': '#0088FE',
        'data': [
          { 'category': 'chainsaw', 'time': 0.0 },
          { 'category': 'bus', 'time': 0.9892816911710921 },
          { 'category': 'NO', 'time': 1.9785633823421842 },
          { 'category': 'NO', 'time': 2.9678450735132764 },
          { 'category': 'NO', 'time': 3.9571267646843684 },
          { 'category': 'NO', 'time': 4.946408455855461 },
          { 'category': 'NO', 'time': 5.935690147026553 },
          { 'category': 'NO', 'time': 6.924971838197645 },
          { 'category': 'NO', 'time': 7.914253529368737 },
          { 'category': 'NO', 'time': 8.90353522053983 },
          { 'category': 'NO', 'time': 9.892816911710922 },
          { 'category': 'NO', 'time': 10.882098602882014 },
          { 'category': 'NO', 'time': 11.871380294053106 },
          { 'category': 'NO', 'time': 12.860661985224198 },
          { 'category': 'NO', 'time': 13.84994367639529 },
          { 'category': 'NO', 'time': 14.839225367566382 },
          { 'category': 'NO', 'time': 15.828507058737474 },
          { 'category': 'NO', 'time': 16.817788749908566 },
          { 'category': 'NO', 'time': 17.80707044107966 },
          { 'category': 'NO', 'time': 18.79635213225075 },
          { 'category': 'NO', 'time': 19.785633823421843 },
          { 'category': 'NO', 'time': 20.774915514592934 },
          { 'category': 'NO', 'time': 21.764197205764027 },
          { 'category': 'NO', 'time': 22.753478896935118 },
          { 'category': 'NO', 'time': 23.74276058810621 },
          { 'category': 'NO', 'time': 24.7320422792773 },
          { 'category': 'NO', 'time': 25.721323970448395 },
          { 'category': 'NO', 'time': 26.710605661619486 },
          { 'category': 'NO', 'time': 27.69988735279058 },
          { 'category': 'NO', 'time': 28.68916904396167 },
          { 'category': 'NO', 'time': 29.678450735132763 },
          { 'category': 'NO', 'time': 30.667732426303854 },
          { 'category': 'NO', 'time': 31.657014117474947 },
          { 'category': 'NO', 'time': 32.64629580864604 },
          { 'category': 'bus', 'time': 33.63557749981713 },
          { 'category': 'bus', 'time': 34.624859190988225 },
          { 'category': 'bus', 'time': 35.61414088215932 },
          { 'category': 'NO', 'time': 36.603422573330405 },
          { 'category': 'NO', 'time': 37.5927042645015 },
          { 'category': 'bus', 'time': 38.58198595567259 },
          { 'category': 'bus', 'time': 39.57126764684369 },
          { 'category': 'NO', 'time': 40.56054933801477 },
          { 'category': 'NO', 'time': 41.54983102918587 },
          { 'category': 'NO', 'time': 42.53911272035696 },
          { 'category': 'NO', 'time': 43.528394411528055 },
          { 'category': 'NO', 'time': 44.51767610269914 },
          { 'category': 'NO', 'time': 45.506957793870235 },
          { 'category': 'NO', 'time': 46.49623948504133 },
          { 'category': 'NO', 'time': 47.48552117621242 },
          { 'category': 'NO', 'time': 48.47480286738352 },
          { 'category': 'NO', 'time': 49.4640845585546 },
          { 'category': 'NO', 'time': 50.4533662497257 },
          { 'category': 'NO', 'time': 51.44264794089679 },
          { 'category': 'NO', 'time': 52.431929632067884 },
          { 'category': 'NO', 'time': 53.42121132323897 },
          { 'category': 'NO', 'time': 54.410493014410065 },
          { 'category': 'NO', 'time': 55.39977470558116 },
          { 'category': 'NO', 'time': 56.38905639675225 },
          { 'category': 'NO', 'time': 57.37833808792334 },
          { 'category': 'NO', 'time': 58.36761977909443 },
          { 'category': 'NO', 'time': 59.35690147026553 },
          { 'category': 'helicopter', 'time': 60.34618316143662 }
        ],
      },
      {
        'name': 'Geophony',
        'color': '#00C49F',
        'data': [
          { 'category': 'NO', 'time': 0.0 },
          { 'category': 'NO', 'time': 0.9892816911710921 },
          { 'category': 'NO', 'time': 1.9785633823421842 },
          { 'category': 'NO', 'time': 2.9678450735132764 },
          { 'category': 'NO', 'time': 3.9571267646843684 },
          { 'category': 'NO', 'time': 4.946408455855461 },
          { 'category': 'NO', 'time': 5.935690147026553 },
          { 'category': 'NO', 'time': 6.924971838197645 },
          { 'category': 'NO', 'time': 7.914253529368737 },
          { 'category': 'NO', 'time': 8.90353522053983 },
          { 'category': 'NO', 'time': 9.892816911710922 },
          { 'category': 'NO', 'time': 10.882098602882014 },
          { 'category': 'NO', 'time': 11.871380294053106 },
          { 'category': 'NO', 'time': 12.860661985224198 },
          { 'category': 'NO', 'time': 13.84994367639529 },
          { 'category': 'NO', 'time': 14.839225367566382 },
          { 'category': 'NO', 'time': 15.828507058737474 },
          { 'category': 'NO', 'time': 16.817788749908566 },
          { 'category': 'NO', 'time': 17.80707044107966 },
          { 'category': 'NO', 'time': 18.79635213225075 },
          { 'category': 'NO', 'time': 19.785633823421843 },
          { 'category': 'NO', 'time': 20.774915514592934 },
          { 'category': 'NO', 'time': 21.764197205764027 },
          { 'category': 'NO', 'time': 22.753478896935118 },
          { 'category': 'NO', 'time': 23.74276058810621 },
          { 'category': 'NO', 'time': 24.7320422792773 },
          { 'category': 'NO', 'time': 25.721323970448395 },
          { 'category': 'NO', 'time': 26.710605661619486 },
          { 'category': 'NO', 'time': 27.69988735279058 },
          { 'category': 'NO', 'time': 28.68916904396167 },
          { 'category': 'NO', 'time': 29.678450735132763 },
          { 'category': 'NO', 'time': 30.667732426303854 },
          { 'category': 'NO', 'time': 31.657014117474947 },
          { 'category': 'NO', 'time': 32.64629580864604 },
          { 'category': 'NO', 'time': 33.63557749981713 },
          { 'category': 'NO', 'time': 34.624859190988225 },
          { 'category': 'NO', 'time': 35.61414088215932 },
          { 'category': 'NO', 'time': 36.603422573330405 },
          { 'category': 'NO', 'time': 37.5927042645015 },
          { 'category': 'NO', 'time': 38.58198595567259 },
          { 'category': 'NO', 'time': 39.57126764684369 },
          { 'category': 'NO', 'time': 40.56054933801477 },
          { 'category': 'NO', 'time': 41.54983102918587 },
          { 'category': 'NO', 'time': 42.53911272035696 },
          { 'category': 'NO', 'time': 43.528394411528055 },
          { 'category': 'NO', 'time': 44.51767610269914 },
          { 'category': 'NO', 'time': 45.506957793870235 },
          { 'category': 'NO', 'time': 46.49623948504133 },
          { 'category': 'NO', 'time': 47.48552117621242 },
          { 'category': 'NO', 'time': 48.47480286738352 },
          { 'category': 'NO', 'time': 49.4640845585546 },
          { 'category': 'NO', 'time': 50.4533662497257 },
          { 'category': 'NO', 'time': 51.44264794089679 },
          { 'category': 'NO', 'time': 52.431929632067884 },
          { 'category': 'NO', 'time': 53.42121132323897 },
          { 'category': 'NO', 'time': 54.410493014410065 },
          { 'category': 'NO', 'time': 55.39977470558116 },
          { 'category': 'NO', 'time': 56.38905639675225 },
          { 'category': 'NO', 'time': 57.37833808792334 },
          { 'category': 'NO', 'time': 58.36761977909443 },
          { 'category': 'NO', 'time': 59.35690147026553 },
          { 'category': 'NO', 'time': 60.34618316143662 }
        ],
      },
      {
        'name': 'Biophony',
        'color': '#FFBB28',
        'data': [
          { 'category': 'NO', 'time': 0.0 },
          { 'category': 'chirping_birds', 'time': 0.9892816911710921 },
          { 'category': 'chirping_birds', 'time': 1.9785633823421842 },
          { 'category': 'chirping_birds', 'time': 2.9678450735132764 },
          { 'category': 'chirping_birds', 'time': 3.9571267646843684 },
          { 'category': 'chirping_birds', 'time': 4.946408455855461 },
          { 'category': 'chirping_birds', 'time': 5.935690147026553 },
          { 'category': 'NO', 'time': 6.924971838197645 },
          { 'category': 'NO', 'time': 7.914253529368737 },
          { 'category': 'NO', 'time': 8.90353522053983 },
          { 'category': 'NO', 'time': 9.892816911710922 },
          { 'category': 'NO', 'time': 10.882098602882014 },
          { 'category': 'crickets', 'time': 11.871380294053106 },
          { 'category': 'crickets', 'time': 12.860661985224198 },
          { 'category': 'chirping_birds', 'time': 13.84994367639529 },
          { 'category': 'chirping_birds', 'time': 14.839225367566382 },
          { 'category': 'chirping_birds', 'time': 15.828507058737474 },
          { 'category': 'NO', 'time': 16.817788749908566 },
          { 'category': 'NO', 'time': 17.80707044107966 },
          { 'category': 'NO', 'time': 18.79635213225075 },
          { 'category': 'NO', 'time': 19.785633823421843 },
          { 'category': 'NO', 'time': 20.774915514592934 },
          { 'category': 'NO', 'time': 21.764197205764027 },
          { 'category': 'crickets', 'time': 22.753478896935118 },
          { 'category': 'crickets', 'time': 23.74276058810621 },
          { 'category': 'crickets', 'time': 24.7320422792773 },
          { 'category': 'chirping_birds', 'time': 25.721323970448395 },
          { 'category': 'chirping_birds', 'time': 26.710605661619486 },
          { 'category': 'chirping_birds', 'time': 27.69988735279058 },
          { 'category': 'chirping_birds', 'time': 28.68916904396167 },
          { 'category': 'chirping_birds', 'time': 29.678450735132763 },
          { 'category': 'NO', 'time': 30.667732426303854 },
          { 'category': 'NO', 'time': 31.657014117474947 },
          { 'category': 'chirping_birds', 'time': 32.64629580864604 },
          { 'category': 'crickets', 'time': 33.63557749981713 },
          { 'category': 'crickets', 'time': 34.624859190988225 },
          { 'category': 'crickets', 'time': 35.61414088215932 },
          { 'category': 'crickets', 'time': 36.603422573330405 },
          { 'category': 'chirping_birds', 'time': 37.5927042645015 },
          { 'category': 'chirping_birds', 'time': 38.58198595567259 },
          { 'category': 'chirping_birds', 'time': 39.57126764684369 },
          { 'category': 'chirping_birds', 'time': 40.56054933801477 },
          { 'category': 'chirping_birds', 'time': 41.54983102918587 },
          { 'category': 'NO', 'time': 42.53911272035696 },
          { 'category': 'NO', 'time': 43.528394411528055 },
          { 'category': 'NO', 'time': 44.51767610269914 },
          { 'category': 'NO', 'time': 45.506957793870235 },
          { 'category': 'NO', 'time': 46.49623948504133 },
          { 'category': 'NO', 'time': 47.48552117621242 },
          { 'category': 'NO', 'time': 48.47480286738352 },
          { 'category': 'crickets', 'time': 49.4640845585546 },
          { 'category': 'crickets', 'time': 50.4533662497257 },
          { 'category': 'chirping_birds', 'time': 51.44264794089679 },
          { 'category': 'NO', 'time': 52.431929632067884 },
          { 'category': 'NO', 'time': 53.42121132323897 },
          { 'category': 'NO', 'time': 54.410493014410065 },
          { 'category': 'chirping_birds', 'time': 55.39977470558116 },
          { 'category': 'chirping_birds', 'time': 56.38905639675225 },
          { 'category': 'NO', 'time': 57.37833808792334 },
          { 'category': 'NO', 'time': 58.36761977909443 },
          { 'category': 'NO', 'time': 59.35690147026553 },
          { 'category': 'NO', 'time': 60.34618316143662 }
        ],
      },
    ]
    return result