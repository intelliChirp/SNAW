from flask import Flask, render_template, send_file, jsonify
from flask import Flask, flash, request, redirect, url_for, session, render_template, jsonify, make_response
from werkzeug.utils import secure_filename
import os
import sys
import subprocess
from analysis.get_spectrogram import runScript as get_spectrogram
from analysis.classification import runScript as get_svm_classification
from analysis.classification_cnn import runScript as get_cnn_classification
from analysis.acousticIndices import getAcousticIndices as get_acoustic_indices
from analysis_driver import run_driver
import traceback
import random
import shutil

UPLOAD_FOLDER = 'instance/upload/'
ALLOWED_EXTENSIONS = {'wav'}
DEBUG_FLAG = False
app = Flask("__main__")
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'secret key'
app.config['SESSION_TYPE'] = 'filesystem'
DEBUG_FLAG = True
'''
###------------------------------------------------------###
App Routing: '/'
Function: home()
###------------------------------------------------------###
renders the index.html along with making sure that the upload
folder is completely empty. This is done to ensure that
no one uploads->refreshes page. Doing so deactivates the
analyze button, so we will assume that users will NOT
hit refresh upon uploading a file.
###------------------------------------------------------###
'''
@app.route('/')
def home():
    getUserFolder()
    return render_template("index.html")


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

'''
###------------------------------------------------------###
App Routing: '/uploader'
Function: upload_file()
Caller: App.js
###------------------------------------------------------###
handles the upload process. receives the files from App.js
and saves the files one at a time to the folder 'instance/upload'
###------------------------------------------------------###
'''
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   getUserFolder()
   if request.method == 'POST':
        # Request.Files comes in a immutable multi-dictionary.
        # MutableList uses a method to convert the imm. multi-dict to a mutable list.
        mutableList = request.files.copy()

        # iterate over a list received from getlist() method provided in mutableList's methodss
        for f in mutableList.getlist('file'):
            # Follow the same procedure as uploading singular files.
            filename = secure_filename(f.filename)
            f.save(os.path.join('instance/upload/user'+session['id'], filename))
        return redirect('', 204)


'''
###------------------------------------------------------###
App Routing: '/didUpload'
Function: didFileUpload()
Caller: Results.js
###------------------------------------------------------###
Checks to see if the folder 'instance/upload' has any contents
within in. returns a string 'True' or 'False' depending on the
condition.
###------------------------------------------------------###
'''
@app.route('/didUpload')
def didFileUpload():
     # Create 'instance/upload/' folder if not present
    if(os.path.isdir('instance/upload/user'+session['id']) == False):
        os.makedirs('instance/upload/user'+session['id'])

    # Check if upload folder contains any files
    if(len(os.listdir('instance/upload/user'+session['id'])) != 0):
        return "True"
    else:
        return "False"



@app.route('/removeFile', methods = ['POST'])
def removeFile():
   file = request.get_json()
   if(file['file'] not in os.listdir('instance/upload/user'+session['id'])):
        print("HELLO")
        return redirect('', 204)
   else:
       os.remove('instance/upload/user' + session['id']+'/'+file['file'])
       return redirect('', 204)

'''
###------------------------------------------------------###
Function: getUserFolder()
Caller: upload_file(), home()
###------------------------------------------------------###
Assigns a user a unique id and creates a folder for usage.
###------------------------------------------------------###
'''
def getUserFolder():
        if('id' not in session):
            session['id'] = 0

        if('user' + str(session['id']) in os.listdir('instance/upload/')):
            for file in os.listdir('instance/upload/user' + session['id']):
                os.remove('instance/upload/user' + session['id']+'/'+file)
            return

        else:
            personID = str(random.randint(0, 999999999999))
            while('user'+ personID in os.listdir('instance/upload/')):
                 personID = str(random.randint(0, 999999999999))



            if('user'+ str(session['id']) not in os.listdir('instance/upload/')):
                session['id'] =  personID


            if not os.path.isdir('instance/upload/user'+session['id']):
                os.makedirs('instance/upload/user'+session['id'])


'''
###------------------------------------------------------###
App Routing: '/results/analysis'
Function: run_analysis()
Caller: Results.js
###------------------------------------------------------###
calls the function runScript() within get_spectrogram.py.
The function runScript() is pulled into api.py as "get_spectrogram()."
After the function finishes operations, the uploaded files will
be deleted.
###------------------------------------------------------###
'''
@app.route("/results/analysis", methods=['GET', 'POST'])
def run_analysis():
    if( DEBUG_FLAG ):
        print("[WORKING] Flask is making call to get_spectrogram.py - api.py")
    try:
        result = run_driver(session['id'])
        if( DEBUG_FLAG ):
            print("[SUCCESS] Spectrogram images have been created - api.py")


        for file in os.listdir('instance/upload/user' + session['id']):
            os.remove('instance/upload/user' + session['id']+'/'+file)

        return result
    except Exception as e:
        return str(e)

#print('Starting Flask!')
app.run(debug=True)
