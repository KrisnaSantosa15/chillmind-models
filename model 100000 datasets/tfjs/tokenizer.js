// This file contains the word index from your tokenizer
// We'll create a simplified version based on your Python tokenizer

class Tokenizer {
    constructor() {
        this.wordIndex = {}; // Will be populated when loaded
        this.oovToken = "<OOV>";
        this.loaded = false;
    }

    async loadWordIndex() {
        try {
            const response = await fetch('word_index.json');
            this.wordIndex = await response.json();
            this.loaded = true;
            console.log("Tokenizer word index loaded successfully");
        } catch (error) {
            console.error("Error loading word index:", error);
        }
    }

    textsToSequences(texts) {
        if (!this.loaded) {
            throw new Error("Tokenizer not loaded yet");
        }

        return texts.map(text => {
            // Preprocess: lowercase and split by space
            const words = text.toLowerCase().split(/\s+/);
            
            // Convert to sequence of indices
            return words.map(word => {
                // Get the word index or use OOV token index
                return this.wordIndex[word] || this.wordIndex[this.oovToken] || 0;
            });
        });
    }
}