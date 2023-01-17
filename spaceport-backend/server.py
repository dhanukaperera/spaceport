
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date

db = SQLAlchemy()
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///spaceships.db"
db.init_app(app)

@app.route("/health", methods=["GET"])
def health():
    """
    Health check endpoint
    """
    return jsonify(status="OK"), 200

class Spaceship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    colour = db.Column(db.String)
    speed = db.Column(db.Integer)
    mfd = db.Column(db.Date)
    pulseLaser = db.Column(db.Boolean)

    def __init__(self, id, colour, speed, mfd, pulseLaser):
        self.id = id
        self.colour = colour
        self.speed = speed
        self.mfd = mfd
        self.pulseLaser = pulseLaser

def spaceship_serializer(spaceship):
    return {
        'id':spaceship.id,
        'colour':spaceship.colour,
        'speed':spaceship.speed,
        'mfd':spaceship.mfd,
        'pulseLaser':spaceship.pulseLaser
    }

query_filters = {
    'all': lambda c: Spaceship.colour.in_(c),
    'any': lambda c: Spaceship.colour.in_(c),
    'none': lambda c: ~Spaceship.colour.in_(c),
    'lt': lambda s: Spaceship.speed < s,
    'eq': lambda s: Spaceship.speed == s,
    'gt': lambda s: Spaceship.speed > s,
    'af': lambda m: Spaceship.mfd > m,
    'ex': lambda m: Spaceship.mfd == m,
    'bf': lambda m: Spaceship.mfd < m
}
def sample_data():
    ship1 = Spaceship(100, "red", 50, date(2012,12,12), True)
    ship2 = Spaceship(101, "green",150, date(2016,11,21), True)
    ship3 = Spaceship(102, "blue", 120, date(2020,5,14), True)
    ship4 = Spaceship(103, "red", 200, date(2000,5,13), False)
    ship5 = Spaceship(104, "green", 110, date(1994,12,22), False)
    ship6 = Spaceship(105, "blue", 90, date(1994,8,11), False)

    db.session.add(ship1)
    db.session.add(ship2)
    db.session.add(ship3)
    db.session.add(ship4)
    db.session.add(ship5)
    db.session.add(ship6)

    db.session.commit()

with app.app_context():
    db.create_all()
    sample_data()

@app.route('/spaceships',methods=['GET'])
def spaceships_list():
    spaceships = Spaceship.query.all()
    return jsonify([*map(spaceship_serializer,spaceships)]), 200

@app.route('/spaceships/filter',methods=['GET'])
def filter_spaceships_list():
    try:
        colour_filter = request.args.get('colour-filter',None)
        colour = request.args.get('colour')

        if(colour):
            colour = colour.split(',')

        speed_filter = request.args.get('speed')[:2]
        speed = request.args.get('speed')[2:]

        mfd_filter =request.args.get('mfd')[:2]
        mfd =request.args.get('mfd')[2:]

        pulse_laser = request.args.get('pulse-laser') == 'true'

        print('pulse_laser')
        print(pulse_laser)
        query = Spaceship.query

        if colour_filter and colour:
            query = query.filter(query_filters[colour_filter](colour))

        if speed_filter and speed:
            query = query.filter(query_filters[speed_filter](speed))

        if mfd_filter and mfd:
            query = query.filter(query_filters[mfd_filter](mfd))

        if pulse_laser:
            query = query.filter(Spaceship.pulseLaser.is_(pulse_laser))


        spaceships = query.all()
        return jsonify([*map(spaceship_serializer,spaceships)]), 200

    except KeyError as e:
        return jsonify(error=f"Invalid filter type: {e}"), 400
    except ValueError as e:
        return jsonify(error=f"Invalid value: {e}"), 400
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
