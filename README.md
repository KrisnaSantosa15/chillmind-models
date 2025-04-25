# ChillMind Models

ChillMind Models is a collection of machine learning models designed to assist in understanding and predicting mental health conditions and emotional states. These models aim to provide insights into mental well-being and emotional patterns, leveraging data-driven approaches.

---

## Models Overview

### 1. Mental Health Prediction Model
This model predicts mental health conditions such as **depression**, **anxiety**, and **stress** using the following assessments:
- **PSS (Perceived Stress Scale)**
- **GAD-7 (Generalized Anxiety Disorder-7)**
- **PHQ-9 (Patient Health Questionnaire-9)**

Additionally, the model incorporates demographic data such as:
- **Age**
- **Academic Year**
- **GPA**
- **Scholarship Status**

#### Dataset
The model is trained on the [Bangladeshi University Students Mental Health Dataset](https://www.kaggle.com/datasets/mohsenzergani/bangladeshi-university-students-mental-health/data) from Kaggle. This dataset provides a comprehensive view of mental health conditions among university students, making it ideal for this application.

---

### 2. Emotion Prediction Model for Journaling
This model is designed for a journaling feature, where users can write simple text entries, and the model predicts the emotion conveyed in the text. The six emotions it can detect are:
- **Joy**
- **Sadness**
- **Anger**
- **Fear**
- **Love**
- **Surprise**

#### Dataset
The model is trained on the [Emotion Dataset](https://huggingface.co/datasets/dair-ai/emotion) from Hugging Face. This dataset contains labeled text data for various emotions, enabling accurate emotion classification.

---

## Use Cases
1. **Mental Health Monitoring**: Provide insights into mental health conditions for early intervention and support.
2. **Emotional Awareness**: Help users understand their emotional patterns through journaling.
3. **Research and Analysis**: Assist researchers in studying mental health and emotional trends.

---

## Installation and Usage
To use the ChillMind models, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/KrisnaSantosa15/chillmind-models.git
    cd chillmind-models
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Open Jupyter Notebook or Python script file to run the models.
    <!-- ```python
    from chillmind_models import MentalHealthModel, EmotionModel

    # Example usage
    mental_health_model = MentalHealthModel()
    emotion_model = EmotionModel()

    # Predict mental health conditions
    prediction = mental_health_model.predict({
         "age": 21,
         "academic_year": 3,
         "gpa": 3.5,
         "scholarship_status": True,
         "pss_score": 18,
         "gad7_score": 10,
         "phq9_score": 12
    })

    # Predict emotion from journal text
    emotion = emotion_model.predict("I feel so happy and excited today!")
    ``` -->

---

## License
This project is licensed under the [CC25-CF133 Capstone Team Private License](LICENSE).

---

## Acknowledgments
- [Kaggle Dataset: Bangladeshi University Students Mental Health](https://www.kaggle.com/datasets/mohsenzergani/bangladeshi-university-students-mental-health/data)
- [Hugging Face Dataset: Emotion](https://huggingface.co/datasets/dair-ai/emotion)
