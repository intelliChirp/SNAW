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
from analysis.classification_cnn import runScript as run_classification
from analysis.get_spectrogram import runScript as run_spectrogram
from analysis.acousticIndices import getAcousticIndices as run_indices

DEBUG_FLAG = True

def run_driver(personalID) :
    if DEBUG_FLAG : print("[WORKING] Attempting to run analysis driver - analysis_driver.py")

    # Create a dictionary for storing
    # And a counter for the files
    listOfImages = {}
    fileCount = 0

    if DEBUG_FLAG : print("[WORKING] Loading CNN Models..")
    all_models = [ load_model('model\\anthro\\ant_cnn_model.h5'),
                    load_model('model\\bio\\bio_cnn_model.h5'),
                    load_model('model\\geo\\geo_cnn_model.h5') ]
    if DEBUG_FLAG : print("[SUCCESS] Loaded CNN Models..")

    try:
        # Retrieve file
        for filename in os.listdir('instance/upload/user'+personalID):

            audiofile = 'instance/upload/user'+personalID+"/"+ filename

            data = run_classification( audiofile, all_models )

            image_list, audio_wav = run_spectrogram( filename, fileCount, audiofile, data )

            indices_list = run_indices( audiofile )

            listOfImages[fileCount] = [filename,
                                       image_list,
                                       audio_wav,
                                       data,
                                       indices_list ]
            fileCount += 1

        # remove all spectrogram pictures from storage
        for file in os.listdir("spectrogram/"):
            os.remove("spectrogram/"+file)

    except:
         track = traceback.format_exc()
         print(track)

    if DEBUG_FLAG : print("[SUCCESS] analysis_driver ran - analysis_driver.py")

    return listOfImages