from flask import Flask, jsonify, request
from flask_cors import CORS

from auth import token_required
from database import Database

app = Flask(__name__)
CORS(app, resources={r'/api/*': {'origins': '*'}})
db = Database()


@app.get('/api/health')
def health_check():
    return {'status': 'ok'}


@app.get('/api/voti')
@token_required(['docente'])
def get_all_grades():
    grades = db.fetch_all(
        '''
        SELECT id, studente_username, studente_nome, materia, voto, created_at
        FROM voti
        ORDER BY created_at DESC, studente_nome ASC
        '''
    )
    return jsonify(grades)


@app.get('/api/voti/miei')
@token_required(['studente'])
def get_my_grades():
    preferred_username = request.user.get('preferred_username')
    grades = db.fetch_all(
        '''
        SELECT id, studente_username, studente_nome, materia, voto, created_at
        FROM voti
        WHERE studente_username = %s
        ORDER BY created_at DESC, materia ASC
        ''',
        (preferred_username,),
    )
    return jsonify(grades)


@app.post('/api/voti')
@token_required(['docente'])
def add_grade():
    payload = request.get_json(force=True)
    studente_nome = payload.get('studenteNome', '').strip()
    studente_username = payload.get('studenteUsername', '').strip()
    materia = payload.get('materia', '').strip()
    voto = payload.get('voto')

    if not studente_nome or not studente_username or not materia or voto is None:
        return jsonify({'message': 'Tutti i campi sono obbligatori'}), 400

    db.execute(
        '''
        INSERT INTO voti (studente_username, studente_nome, materia, voto)
        VALUES (%s, %s, %s, %s)
        ''',
        (studente_username, studente_nome, materia, voto),
    )
    return jsonify({'message': 'Voto inserito con successo'}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
