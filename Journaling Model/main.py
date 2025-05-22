import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import uvicorn

app = FastAPI(title="Emotion Classification API")

# Load model and tokenizer
print("Loading model and tokenizer...")
try:
    model = tf.keras.models.load_model('/code/app/emotion_model.h5')
    
    with open('/code/app/emotion_tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    
    print("Model and tokenizer loaded successfully!")
except Exception as e:
    print(f"Error loading model or tokenizer: {e}")
    raise

# Maximum sequence length - must match what you used during training
MAX_SEQUENCE_LENGTH = 128

class TextInput(BaseModel):
    text: str

class Prediction(BaseModel):
    emotion: str
    confidence: float
    all_probabilities: dict

@app.get("/")
def read_root():
    return {"message": "Emotion Classification API is running! Send POST requests to /predict/"}

@app.post("/predict/", response_model=Prediction)
def predict_emotion(input_data: TextInput):
    # Preprocess text
    sequences = tokenizer.texts_to_sequences([input_data.text])
    padded = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)
    
    # Get prediction
    prediction = model.predict(padded)[0]
    emotion_index = np.argmax(prediction)
    
    emotions = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
    
    return {
        'emotion': emotions[emotion_index],
        'confidence': float(prediction[emotion_index]),
        'all_probabilities': {emotion: float(prob) for emotion, prob in zip(emotions, prediction)}
    }

# Simple test endpoint with predefined examples
@app.get("/test/")
def test_prediction():
    test_texts = [
        "just trying to take each day as it comes, focusing on eating better.",
        "that feeling when i finally got accepted after applying for years!",
        "i literally can't stand having violent thoughts, they make me so uncomfortable",
        "my body is screaming for sleep, but my brain refuses to shut down #exhausted"
    ]
    
    results = []
    for text in test_texts:
        sequences = tokenizer.texts_to_sequences([text])
        padded = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)
        prediction = model.predict(padded)[0]
        emotion_index = np.argmax(prediction)
        emotions = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
        
        results.append({
            'text': text,
            'emotion': emotions[emotion_index],
            'confidence': float(prediction[emotion_index])
        })
    
    return {"results": results}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)