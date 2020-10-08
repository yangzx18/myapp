from flask import Flask,render_template,request


from linkbook.main import linkbook_api

app = Flask(__name__)

app.register_blueprint(linkbook_api,url_prefix="/api/linkbook")

@app.route('/')
def index():
    return render_template('myapp.html')






if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9889,debug=True)
