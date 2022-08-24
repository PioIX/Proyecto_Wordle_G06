from flask import Flask, render_template, request, jsonify
import sqlite3
import random

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/reglas')
def reglas():
    return render_template('reglas.html')


@app.route('/cuadro', methods=['POST', 'GET'])
def cuadro():

    if request.method == 'POST':
      name = request.form['nombre']
      conn = sqlite3.connect('Wordle_BD.db')
  
      q = f"""INSERT INTO Jugadores (nombre) 
      VALUES ('{name}')"""
  
      conn.execute(q)
      conn.commit()
  
      return render_template('cuadro.html')
    else:
      return render_template('cuadro.html')


@app.route('/proyecto')
def proyecto():
    return render_template('proyecto.html')


@app.route('/traerLista', methods=['POST', 'GET'])
def traerLista():
  i = random.randint(0, 19)
  if request.method == "POST":
    qtc_data = request.get_json()
    print(qtc_data)
    conn = sqlite3.connect('Wordle_BD.db')
    q = f"""SELECT * FROM Palabras WHERE id_palabra = ('{i}')"""
    respuesta = conn.execute(q)

  results = {'lista': respuesta.fetchall()}
  print(results)
  return jsonify(results)

app.run(host='0.0.0.0', port=81)
