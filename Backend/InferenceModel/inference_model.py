from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax
import pickle


# Loading our models
with open('InferenceModel/pickles/roberta-sentiment-model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('InferenceModel/pickles/roberta-sentiment-tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

# Defining labels
labels = ['Negative', 'Neutral', 'Positive']


def calculate_sentiment(input_sentence=str):

    encoded_input = tokenizer(input_sentence, return_tensors='pt')
    # From our encoded input, we now calculate the sentiment of the input
    output = model(**encoded_input)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    results = {}

    for i in range(len(scores)):

        l = labels[i]
        s = scores[i]
        results[l] = s

    return results


# When we run the script, we call the function
# if __name__ == "__main__":
#     calculate_sentiment(input_sentence='I hate vegetables')
