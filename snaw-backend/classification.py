from pyAudioAnalysis import audioSegmentation as aS
import sys
import wave
import contextlib
import os
from flask import jsonify

DEBUG_FLAG = False

# function that runs the classification functions on the selected audio file
# builds the dictionary of category with associated timestamps
def classify_file( audiofile, model, model_type, model_color ):

    # sets duration of audiofile, for getting the timestamps of each classification
    with contextlib.closing(wave.open(audiofile,'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)
        if( DEBUG_FLAG ):
            print(duration)

    # pulls all the data given from the classification function
    [flagsInd, classesAll, acc, CM] = aS.mtFileClassification(audiofile, model,"svm")

    flag_len = len(flagsInd) # amount of segments made
    segment = duration / flag_len # length of each time segment

    # dictionary to be built of timestamps and categories
    classify_dict = {'name' : model_type,
                     'color' : model_color,
                     'data' : []}

    classify_dict['data'].append(  { "category" : "NO",
                                             "time" : 0 } )

    for index in range(flag_len):
        timestamp = segment * index + 1 # current timestamp

        # builds dictionary
        classify_dict['data'].append(  { "category" : classesAll[int(flagsInd[index])],
                                         "time" : timestamp } )
        # used for console logging
        # print( str( "{ category: '" + classesAll[int(flagsInd[index])] ) + "', time: " + str(timestamp) + " }," )

    return classify_dict

def anthro_model():
    modelfile = 'model/anthro/svmAnthroClassModel'
    return modelfile

def bio_model():
   modelfile = 'model/bio/svmBioClassModel'
   return modelfile

def geo_model():
    modelfile = 'model/geo/svmGeoClassModel'
    return modelfile

# driver function
def runScript():
    if( DEBUG_FLAG ):
        print("[WORKING] Attempting to run SVM classification calculator - classification_svm.py")
    # Create dictionary for storing return information
    finalResult = {}
    # Create a counter for files
    fileCount = 0

    try:
        # Retrieve File
        for filename in os.listdir('instance/upload/'):
            audiofile = "instance/upload/" + filename

            # Create list to store information
            result = []
            if( DEBUG_FLAG ):
                print("[WORKING] Attempting to run anthrophony classification - classification.py")
            result.append( classify_file( audiofile, anthro_model(), 'Anthrophony', '#0088FE' ) )
            if( DEBUG_FLAG ):
                print("[WORKING] Attempting to run geophony classification - classification.py")
            result.append( classify_file(audiofile, bio_model(), 'Biophony', '#00C49F' ) )
            if( DEBUG_FLAG ):    
                print("[WORKING] Attempting to run biophony classification - classification.py")
            result.append( classify_file(audiofile, geo_model(), 'Geophony', '#FFBB28' ) )

            # Add result list to finalResult dictionary with filecounter as the key
            finalResult[fileCount] = result
            fileCount += 1


    except:
        if( DEBUG_FLAG ):
            print('[FAILURE  -- Classification 1] File upload unsuccessful, or not file uploaded.')

    if( DEBUG_FLAG ):
        print("[SUCCESS] Classification was successful - classification.py")
    return finalResult