from flask import Flask, jsonify, request, Blueprint, render_template
from api.text import PosSegment
from flask_cors import CORS
from database import DB
from api.config import sql_insert
import time
import logging

logging.basicConfig(filename="corpus.log", level=logging.INFO,
                    format='%(asctime)s - %(filename)s:%(lineno)s - %(name)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder="./dist/static", template_folder='./dist')

CORS(app)

db = DB(db_conf="corpus.db")

ADD_TIME = lambda: time.strftime("%Y-%m-%d %X")


# corpus = Blueprint('corpus', __name__)
# app.register_blueprint(corpus, url_prefix='/corpus')


@app.route("/corpus", methods=['POST'])
@app.route("/", methods=['GET', 'POST'])
def corpus():
    ip_addr: str = request.remote_addr
    user_agent: str = request.headers.get('User-Agent')
    logger.info("ip addr [%s] user_agent[%s]", ip_addr, user_agent)
    if request.method == 'POST':
        data = request.get_json()
        if len(data.get('content')) > 10000:
            return jsonify(status="error", message="内容超过1万字"), 401

        if len(data.get('user_words')) > 500 or len(data.get('stop_words')) > 500:
            return jsonify(status='error', message="用户字典或停用词过多"), 402

        content = data.get('content').replace("\n", "").replace("\t", "").replace("\r\n", "")
        user_words = data.get("user_words").split("\n") if data.get('user_words') else []
        stop_words = data.get('stop_words').split("\n") if data.get('stop_words') else []

        pos = PosSegment(text=content,
                         user_words=user_words,
                         stop_words=stop_words,
                         delete_punctuation=data.get('delete_punctuation', False))

        word_count, punctuation_count, word_cloud = pos.count_words(15)
        seg_count = pos.count_segment(15)
        delete_punctuation = 1 if data.get('delete_punctuation') else 0
        params = (ip_addr, content, "/".join(user_words),
                  "/".join(stop_words), delete_punctuation, ADD_TIME(),
                  user_agent)
        try:
            db.insert(sql_insert, params=params)
        except Exception as e:
            logger.info(params)
            logger.error(e)

        return jsonify(status="success",
                       word_count=word_count,
                       punctuation_count=punctuation_count,
                       seg_count=seg_count,
                       word_cloud=word_cloud
                       )
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
