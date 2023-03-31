print(f'Loading {__name__}')
from flask_restful import Resource, reqparse
from sqlalchemy import exc
from __main__ import db
from .models import UserModel, RevokeTokenModel, LocationModel
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt)


parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)

class UserRegistration(Resource):
    def post(self):
        
        data = parser.parse_args()
        
        if UserModel.find_by_username(data['username']):
            return {'message': 'Username {} already exists.'.format(data['username'])},409


        new_user = UserModel(
            username = data['username'],
            password = UserModel.generate_hash(data['password']) 
        )
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])

            return{
                'message': 'User {} was created'.format(data['username']),
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        except:
            return{
                'message': 'Something went wrong'
            }, 500
    
class UserLogin(Resource):
    def post(self):

        data = parser.parse_args()
        current_user = UserModel.find_by_username(data['username'])

        if not current_user:
            return {'message': 'Username {} doesn\'t exist'.format(data['username'])},409
        
        if UserModel.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'message': 'Logged in as {}'.format(data['username']),
                'access_token': access_token,
                'refresh_token': refresh_token
                }
        else:
            return {'message': 'Wrong credentials'}, 400

location_parser = reqparse.RequestParser()
location_parser.add_argument('username', help = 'This field cannot be blank', required = True)
location_parser.add_argument('latitude')
location_parser.add_argument('longitude')
location_parser.add_argument('city')
location_parser.add_argument('province')
location_parser.add_argument('country')

class AddLocation(Resource):
    @jwt_required()
    def post(self):
        
        data = location_parser.parse_args()
        #do login check on frontend, if not logged in, no request will be made to database (nothing to store)
        current_user = UserModel.find_by_username(data['username'])

        new_location = LocationModel(
            latitude = data['latitude'],
            longitude = data['longitude'],
            city = data['city'],
            province = data['province'],
            country = data['country'],
            user_id = current_user.id
        )
        try:
            new_location.save_to_db() 
            return {
                'message': 'Added location'
            }
        
        except Exception as e:
            if(type(e) == exc.IntegrityError):
                return{'mesesage': 'Cannot add same location twice'}, 409
            
            return{'message': 'Something went wrong'}, 500

get_all_location_parser = reqparse.RequestParser()
get_all_location_parser.add_argument('username', help = 'This field cannot be blank', required = True)

class GetAllLocations(Resource):
    @jwt_required()
    def post(self):
        data = get_all_location_parser.parse_args()

        try:
            user_id = UserModel.find_by_username(data['username']).id
            return LocationModel.return_all_from_user(user_id)
        except:
            return {'message': 'Something went wrong'},500 

class DeleteLocations(Resource):
    @jwt_required()
    def delete(self):
        test = 12

class UserLogoutAccess(Resource):
    @jwt_required()
    def post(self):
        jti = get_jwt()['jti']
        print(jti)
        try:
            revoked_token = RevokeTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'},500
    
class UserLogoutRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        jti = get_jwt()['jti']
        try:
            revoked_token = RevokeTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Refresh token has been revoked'}
        except:
            return {'message': 'Something went wrong'},500

class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity
        access_token = create_access_token(identity=current_user)
        return {'access_token': access_token} 

class AllUsers(Resource):
    def get(self):
        return UserModel.return_all()
    def delete(self):
        return UserModel.delete_all()
    
class GetWorldLocationData(Resource):
    def get(self):
        import json
        file = open ('C:/Users/amm98\Documents/fullstackapp/backend/worldData/proccessed_for_select_locations.json', "rb")
        json_data = json.load(file)
        file.close
        return json_data
