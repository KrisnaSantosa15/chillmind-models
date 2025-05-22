import pickle
import json

# Load the tokenizer
with open('emotion_tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Get the word index
word_index = tokenizer.word_index

# Save to JSON file
with open('word_index.json', 'w') as f:
    json.dump(word_index, f)

print("Word index exported to word_index.json")