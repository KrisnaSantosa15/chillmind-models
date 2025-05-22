// Global variables
let model;
const tokenizer = new Tokenizer();
const MAX_SEQUENCE_LENGTH = 128;
const emotions = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise'];

// Helper function to pad sequences (like pad_sequences in Keras)
function padSequences(sequences, maxLen, padding = 'post', truncating = 'post', value = 0) {
    return sequences.map(seq => {
        // Truncate if necessary
        if (seq.length > maxLen) {
            if (truncating === 'pre') {
                seq = seq.slice(seq.length - maxLen);
            } else {
                seq = seq.slice(0, maxLen);
            }
        }
        
        // Pad if necessary
        if (seq.length < maxLen) {
            const pad = Array(maxLen - seq.length).fill(value);
            if (padding === 'pre') {
                seq = [...pad, ...seq];
            } else {
                seq = [...seq, ...pad];
            }
        }
        
        return seq;
    });
}

// Load the model
async function loadModel() {
    try {
        // Show loading indicator
        document.getElementById('loading').style.display = 'block';
        
        // Load the tokenizer word index
        await tokenizer.loadWordIndex();
        
        // Load the model
        model = await tf.loadLayersModel('model/model.json');
        console.log('Model loaded successfully');
        
        // Hide loading indicator and show content
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } catch (error) {
        console.error('Error loading model or tokenizer:', error);
        document.getElementById('loading').innerHTML = 
            '<p>Error loading model. Please check console for details.</p>';
    }
}

// Predict emotion from text
async function predictEmotion(text) {
    try {
        // Preprocess text
        const sequences = tokenizer.textsToSequences([text]);
        const paddedSequences = padSequences(sequences, MAX_SEQUENCE_LENGTH);
        
        // Convert to tensor
        const inputTensor = tf.tensor2d(paddedSequences);
        
        // Make prediction
        const predictions = await model.predict(inputTensor).data();
        
        // Find the emotion with highest confidence
        let maxIndex = 0;
        let maxValue = predictions[0];
        
        for (let i = 1; i < predictions.length; i++) {
            if (predictions[i] > maxValue) {
                maxIndex = i;
                maxValue = predictions[i];
            }
        }
        
        // Format results
        const result = {
            emotion: emotions[maxIndex],
            confidence: maxValue,
            allProbabilities: {}
        };
        
        emotions.forEach((emotion, index) => {
            result.allProbabilities[emotion] = predictions[index];
        });
        
        return result;
    } catch (error) {
        console.error('Error during prediction:', error);
        throw error;
    }
}

// Display results
function displayResults(result) {
    const resultDiv = document.getElementById('result');
    const mainEmotionElement = document.getElementById('mainEmotion');
    const emotionBarsElement = document.getElementById('emotionBars');
    
    // Display main emotion
    mainEmotionElement.textContent = `The main emotion is: ${result.emotion} (${(result.confidence * 100).toFixed(2)}% confidence)`;
    
    // Display all emotions as bars
    emotionBarsElement.innerHTML = '';
    
    emotions.forEach(emotion => {
        const probability = result.allProbabilities[emotion];
        const percentage = (probability * 100).toFixed(2);
        
        const barContainer = document.createElement('div');
        barContainer.className = 'emotion-bar';
        
        const label = document.createElement('div');
        label.className = 'emotion-label';
        label.textContent = emotion;
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        const bar = document.createElement('div');
        bar.className = 'emotion-value';
        bar.style.width = `${percentage}%`;
        
        const value = document.createElement('div');
        value.textContent = `${percentage}%`;
        
        progressContainer.appendChild(bar);
        barContainer.appendChild(label);
        barContainer.appendChild(progressContainer);
        barContainer.appendChild(value);
        
        emotionBarsElement.appendChild(barContainer);
    });
    
    resultDiv.style.display = 'block';
}

// Use example text
function useExample(text) {
    document.getElementById('textInput').value = text;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load model when page loads
    loadModel();
    
    // Set up event listener for analyze button
    document.getElementById('analyzeBtn').addEventListener('click', async () => {
        const text = document.getElementById('textInput').value.trim();
        
        if (text) {
            try {
                // Show loading state
                document.getElementById('analyzeBtn').textContent = 'Analyzing...';
                document.getElementById('analyzeBtn').disabled = true;
                
                // Predict emotion
                const result = await predictEmotion(text);
                
                // Display results
                displayResults(result);
            } catch (error) {
                alert('Error analyzing text. See console for details.');
                console.error(error);
            } finally {
                // Reset button
                document.getElementById('analyzeBtn').textContent = 'Analyze Emotion';
                document.getElementById('analyzeBtn').disabled = false;
            }
        } else {
            alert('Please enter some text to analyze.');
        }
    });
});