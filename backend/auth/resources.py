print(f'Loading {__name__}')
from flask_restful import Resource, reqparse
from .models import UserModel, RevokeTokenModel
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt)
#API changes:
#Renamed get_raw_jwt() to get_jwt()
#@jwt_refresh_token_required is now @jwt_required(refresh=True)

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
        print(data)

        if not current_user:
            return {'message': 'Username {} doesn\'t exist'.format(data['username'])}
        
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
    
class SecretResource(Resource):
    @jwt_required()
    def get(self):
        return RevokeTokenModel.return_all_tokens()