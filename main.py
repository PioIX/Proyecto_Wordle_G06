from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/reglas')
def reglas():
  return render_template('reglas.html')

@app.route('/cuadro')
def cuadro():
  return render_template('cuadro.html')
app.run(host='0.0.0.0', port=81)