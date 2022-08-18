from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/reglas')
def reglas():
  return render_template('reglas.html')

@app.route('/cuadro', methods=['POST', 'GET'])
def cuadro():
  
  name = request.form['nombre']
  conn = sqlite3.connect('Wordle_BD.db')
  
  q = f"""INSERT INTO Jugadores (nombre) 
    VALUES ('{name}')"""
  
  conn.execute(q)
  conn.commit()  
  
  
  
  return render_template('cuadro.html')


@app.route('/proyecto')
def proyecto():
  return render_template('proyecto.html')
  
app.run(host='0.0.0.0', port=81)