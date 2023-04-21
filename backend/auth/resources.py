print(f'Loading {__name__}')
from flask_restful import Resource, reqparse
from sqlalchemy import exc
from __main__ import db
from .models import UserModel, RevokeTokenModel, LocationModel
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt)


parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required = True)

user_parser = parser.copy()
user_parser.add_argument('password', help = 'This field cannot be blank', required = True)

class UserRegistration(Resource):
    def post(self):
        
        data = user_parser.parse_args()
        
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
        except Exception as e:
            print('Login error: ' + e)
            return{
                'message': 'Something went wrong'
            }, 500
    
class UserLogin(Resource):
    def post(self):

        data = user_parser.parse_args()
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

location_parser = parser.copy()
location_parser.add_argument('username', help = 'This field cannot be blank', required = True)
location_parser.add_argument('latitude')
location_parser.add_argument('longitude')
location_parser.add_argument('city', type=dict)
location_parser.add_argument('province', type=dict)
location_parser.add_argument('country', type=dict)

class AddLocation(Resource):
    @jwt_required()
    def post(self):
        
        data = location_parser.parse_args()
        #do login check on frontend, if not logged in, no request will be made to database (nothing to store)
        current_user = UserModel.find_by_username(data['username'])

        new_location = LocationModel(
            latitude = data['latitude'],
            longitude = data['longitude'],
            city = data['city']['name'],
            province = data['province']['name'],
            state_code = data['province']['state_code'],
            country = data['country']['name'],
            iso2 = data['country']['iso2'],
        )
        try:
            location_if_exists = LocationModel.does_location_already_exist(data['city']['name'], data['province']['name'], data['country']['name'] )

            
            if(not location_if_exists):
                new_location.save_to_db()
                new_location.save_to_assoc_table(current_user)

                return {
                    'message': 'Added location',
                    'id' : new_location.id
                }
            else:
                location_if_exists.save_to_assoc_table(current_user)

        
        except Exception as e:
            print(e)
            if(type(e) == exc.IntegrityError):
                return{'mesesage': 'Cannot add same location twice'}, 409
            
            return{'message': 'Something went wrong'}, 500

get_all_location_parser = parser.copy()

class GetAllLocations(Resource):
    @jwt_required()
    def post(self):
        data = get_all_location_parser.parse_args()

        try:
            user_id = UserModel.find_by_username(data['username']).id
            return UserModel.return_all_user_locations(user_id)
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
    