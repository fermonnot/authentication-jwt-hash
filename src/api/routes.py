"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

def set_password(password):
    return generate_password_hash(password)

def check_password(hash_pasword,password):
    return check_password_hash(hash_pasword,password)

@api.route('/users', methods=['GET'])
@api.route('/users/<int:user_id>', methods=['GET'])
def handle_users(user_id = None):
    if request.method == 'GET':
        if user_id is None:
            users = User()
            users = users.query.all()

            return jsonify(list(map(lambda item: item.serialize(), users))) , 200
        else:
            user = User()
            user = user.query.get(user_id)
            if user:
                return jsonify(user.serialize())
            
        return jsonify({"message":"not found"}), 404

@api.route('/user', methods=['POST'])   
def add_user():
    if request.method == 'POST':
        body = request.json
        email = body.get('email',None)
        password = body.get('password',None)
        nick_name = body.get('nick_name',None)
       
        
        if email is None or password is None or nick_name is None:
            return jsonify('Por favor, complete los campos correctamente'),400
        else:
            password= set_password(password)
            print('guardar',password)  
            request_user= User(email=email,password=password, nick_name=nick_name)
            db.session.add(request_user)

            try:
                db.session.commit()
                return jsonify ('good'),201
            except Exception as error:
                db.session.rollback()
                return jsonify(error.args),500      
    return jsonify(),201 


@api.route('/login',methods=['POST'])
def login():
    if request.method == 'POST':
        body = request.json
        email = body.get('email',None)
        password = body.get('password',None)


        login_user = User.query.filter_by(email=email).one_or_none()
        if login_user:
            if check_password(login_user.password,password):
                acess = create_access_token(identity=login_user.id)
            return jsonify({'token':acess}),200

        else:
            return jsonify ('acceso denegado'),400 

    return jsonify ('bienvenido'),201
