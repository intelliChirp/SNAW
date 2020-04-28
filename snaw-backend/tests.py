import random
import unittest
from analysis.classification_cnn import classify_file as class_run
from analysis.classification_cnn import classify_file as class_driver
from analysis.get_spectrogram import runScript as spectro_driver
from keras.models import load_model
import audioread

class TestSequenceFunctions(unittest.TestCase):

    def setUp(self):
        self.seq = range(10)
        self.good = "./good.wav"
        self.bad = "./bad.wav"
        self.models = [ load_model('model\\anthro\\ant_cnn_model.h5'),
                                                     load_model('model\\bio\\bio_cnn_model.h5'),
                                                     load_model('model\\geo\\geo_cnn_model.h5') ]

    def testclassification(self):
        self.assertTrue( class_driver(self.good, self.models) )
        self.assertTrue( class_run(self.good, self.models ) )
        with self.assertRaises(audioread.exceptions.NoBackendError) :
            class_run( self.bad, self.models )
        with self.assertRaises(audioread.exceptions.NoBackendError) :
            class_driver( self.bad, self.models )

    def testspectrogram(self):
        self.assertTrue( spectro_driver(self.good, 0, self.good, class_driver(self.good, self.models) ) )
        with self.assertRaises(ValueError):
            spectro_driver(self.good, 0, self.good, {} )

suite = unittest.TestLoader().loadTestsFromTestCase(TestSequenceFunctions)
unittest.TextTestRunner(verbosity=2).run(suite)
