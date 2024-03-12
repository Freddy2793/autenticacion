"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import json

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    usuario=User.query.filter_by(email=username).first()
    if usuario is None:
        return jsonify({"msg": "no existe el usuario"}), 401
    if username != usuario.email or password != usuario.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


@api.route("/registrar", methods=["POST"])
def register():
    body=json.loads(request.data)
    usuario=User.query.filter_by(email=body["email"]).first()
    if usuario is None:
        nuevoUsuario=User(
            email=body["email"],
            password=body["password"]
        )
        db.session.add(nuevoUsuario)
        db.session.commit()
        return jsonify(nuevoUsuario.serialize()),200
    return jsonify({"msg": "el usuario ya existe"}), 401