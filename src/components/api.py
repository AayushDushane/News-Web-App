

from flask import Flask, request, jsonify
from newspaper import Article
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

API_KEY = 'bef586f3eba14c3a99172a00a8db1ece'

def fetch_news_articles(category='general', country='in'):
    try:
        url = f'https://newsapi.org/v2/top-headlines?country={country}&category={category}&apiKey={API_KEY}'
        response = requests.get(url)
        data = response.json()
        if 'articles' in data:
            return data['articles']
        else:
            return []
    except Exception as e:
        return []

def fetch_article_content(article_url):
    try:
        news_article = Article(article_url)
        news_article.download()
        news_article.parse()
        full_article_content = news_article.text

        return {'content': full_article_content}
    except Exception as e:
        return {'error': f"An error occurred while fetching article content: {e}"}

@app.route('/api/news', methods=['GET'])
def get_news():
    category = request.args.get('category', 'general')
    country = request.args.get('country', 'in')

    news_articles = fetch_news_articles(category=category, country=country)
    return jsonify(news_articles)

@app.route('/api/article', methods=['GET'])
def get_article():
    article_url = request.args.get('url', '')

    article_content = fetch_article_content(article_url)
    return jsonify(article_content)

if __name__ == '__main__':
    app.run(debug=True)
