from keras.models import load_model
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D, LSTM, Activation
from keras.utils import to_categorical
import wandb
from wandb.keras import WandbCallback
import matplotlib.pyplot as plt
import sklearn.metrics as metrics
import librosa
import numpy as np
import traceback
import os
import json

DEBUG_FLAG = True
PREDICTION_VERBOSE = False

def classify_file( audio_file ) :
    # load the models
    if DEBUG_FLAG : print("[WORKING] Loading CNN Models..")

    all_models = [ load_model('model\\anthro\\ant_cnn_model.h5'),
                    load_model('model\\bio\\bio_cnn_model.h5'),
                    load_model('model\\geo\\geo_cnn_model.h5') ]
    
    if DEBUG_FLAG : print("[SUCCESS] Loaded CNN Models..")

    all_labels = [ ["AAT", "AHV", "AMA", "ART", "ASI", "AVH", "AVT"],
                   ["BRA", "BAM", "BBI", "BMA", "BIN"],
                   ["GOC", "GRA", "GST","GWG", "GWC"] ]

    classify_dict = [ {'name' : 'Anthrophony',
                     'color' : '#0088FE',
                     'data' : [] },
                      {'name': 'Biophony',
                       'color': '#00C49F',
                       'data': [] },
                      {'name': 'Geophony',
                       'color': '#FFBB28',
                       'data': [] } ]

    ## Running the models

    n_mfcc = 128 # bucket size !!SUBJECT TO CHANGE!!
    max_len = 32 # max_len size !!SUBJECT TO CHANGE!!
    channels = 1 # channels !!SUBJECT TO CHANGE!!

    # convert file to wav2mfcc
    # Mel-frequency cepstral coefficients
    file_path = audio_file
    big_wave, sr = librosa.load(file_path, mono=True, sr=None)

    for sec_index in range( int(big_wave.shape[0] / sr) ) :
        start_sec = sec_index
        end_sec = sec_index + 1

        sec_to_trim = np.array( [ float(start_sec), float(end_sec) ] )
        sec_to_trim = np.ceil( sec_to_trim * sr )

        wave = big_wave[int(sec_to_trim[0]) : int(sec_to_trim[1])]

        wave = np.asfortranarray(wave[::3])
        mfcc = librosa.feature.mfcc(wave, sr=16000, n_mfcc=n_mfcc)

        # If maximum length exceeds mfcc lengths then pad the remaining ones
        if (max_len > mfcc.shape[1]):
            pad_width = max_len - mfcc.shape[1]
            mfcc = np.pad(mfcc, pad_width=((0, 0), (0, pad_width)), mode='constant')

        # Else cutoff the remaining parts
        else:
            mfcc = mfcc[:, :max_len]

        # Convert wav to MFCC
        #prediction_data = wav2mfcc('./prediction/nature_sc.wav')
        prediction_data = mfcc

        # Reshape to 4 dimensions
        prediction_data = prediction_data.reshape(1, n_mfcc, max_len, channels)

        # Run the model on the inputted file

        all_predicted = [ model.predict(prediction_data) for model in all_models ]

        for labels, predicted, classification in zip( all_labels, all_predicted, classify_dict ) :
            # Output the prediction values for each class
            if( PREDICTION_VERBOSE ):
                print ('PREDICTED VALUES')
            labels_indices = range(len(labels))
            max_value = 0
            max_value_index = 0
            for index in labels_indices:
                if( PREDICTION_VERBOSE ):
                    print("\n", labels[index], ": ", '%.08f' % predicted[0,index])
                if predicted[0,index] > max_value:
                    max_value_index = index
                    max_value = predicted[0,index]

            # Output the prediction
            if max_value < 0.5:
                if( PREDICTION_VERBOSE ):
                    print("GUESS: Nothing")
                classification['data'].append( { "category" : "NO", "time" : start_sec } )
            else:
                if( PREDICTION_VERBOSE ):
                    print('\n\nGUESS: ', labels[max_value_index])
                classification['data'].append( { "category" : labels[max_value_index], "time" : start_sec } )
    if( PREDICTION_VERBOSE ):
        print(classify_dict)

    return classify_dict

# driver function
def runScript(audiofile):
    if DEBUG_FLAG : print("[WORKING] Attempting to run CNN classification calculator - classification_svm.py")

    # Create dictionary for storing return information
    # Create a counter for files
    finalResult = {}
    fileCount = 0

    try:
        result = classify_file( audiofile )

        # Add result list to finalResult dictionary with filecounter as the key
        finalResult[fileCount] = result
        fileCount += 1

    except Exception as e:
        track = traceback.format_exc()
        print(track)

    if PREDICTION_VERBOSE : print(json.dumps(finalResult))

    if DEBUG_FLAG : print("[SUCCESS] CNN Classification - classification.py")

    return finalResult