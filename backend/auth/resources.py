from flask_jwt_extended import (get_csrf_token, create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, set_access_cookies, set_refresh_cookies)
from .models import UserModel, RevokeTokenModel, LocationModel
from sqlalchemy import exc
from flask import make_response
from flask_restful import Resource, reqparse
print(f'Loading {__name__}')


parser = reqparse.RequestParser()
parser.add_argument('username', help='This field cannot be blank', required=True)

user_parser = parser.copy()
user_parser.add_argument('password', help='This field cannot be blank', required=True)


class UserRegistration(Resource):
    def post(self):

        data = user_parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {'message': 'Username {} already exists.'.format(data['username'])}, 409

        new_user = UserModel(
            username=data['username'],
            password=UserModel.generate_hash(data['password'])
        )
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            csrf_access_token = get_csrf_token(access_token)
            csrf_refresh_token = get_csrf_token(refresh_token)

            response = make_response({
                'message': 'User {} was created'.format(data['username']),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'csrf_access_token': csrf_access_token,
                'csrf_refresh_token': csrf_refresh_token
            }, 201)

            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response
        except Exception as e:
            print('Login error: ' + e)
            return {
                'message': 'Something went wrong'
            }, 500


class UserLogin(Resource):
    def post(self):

        data = user_parser.parse_args()
        current_user = UserModel.find_by_username(data['username'])

        if not current_user:
            return {'message': 'Username {} doesn\'t exist'.format(data['username'])}, 409

        if UserModel.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            csrf_access_token = get_csrf_token(access_token)
            csrf_refresh_token = get_csrf_token(refresh_token)

            response = make_response({
                'message': 'Logged in as {}'.format(data['username']),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'csrf_access_token': csrf_access_token,
                'csrf_refresh_token': csrf_refresh_token
            }, 200)

            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response
        else:
            return {'message': 'Wrong credentials'}, 400


location_parser = parser.copy()
location_parser.add_argument('username', help='This field cannot be blank', required=True)
location_parser.add_argument('latitude')
location_parser.add_argument('longitude')
location_parser.add_argument('city', type=dict, required=True)
location_parser.add_argument('province', type=dict, required=True)
location_parser.add_argument('country', type=dict, required=True)


class AddLocation(Resource):
    @jwt_required()
    def post(self):
        user = get_jwt_identity()
        data = location_parser.parse_args()

        current_user = UserModel.find_by_username(user)

        new_location = LocationModel(
            latitude=data['latitude'],
            longitude=data['longitude'],
            city=data['city']['name'],
            province=data['province']['name'],
            state_code=data['province']['state_code'],
            country=data['country']['name'],
            iso2=data['country']['iso2'],
        )
        try:
            location_if_exists = LocationModel.does_location_already_exist(
                data['city']['name'], data['province']['name'], data['country']['name'])

            if (not location_if_exists):
                new_location.save_to_db()
                new_location.save_to_assoc_table(current_user)

                return {
                    'message': 'Added location',
                    'id': new_location.id
                }, 201  # Indicates that the request has succeeded and a new resource has been created as a result.
            else:
                location_if_exists.save_to_assoc_table(current_user)

                return {
                    'message': 'Added location',
                    'id': location_if_exists.id
                }

        except Exception as e:
            print(e)
            if (type(e) == exc.IntegrityError):
                return {'mesesage': 'Cannot add same location twice'}, 409

            return {'message': 'Something went wrong'}, 500


class GetAllLocations(Resource):
    @jwt_required()
    def post(self):
        try:
            user = get_jwt_identity()
            current_user: UserModel = UserModel.find_by_username(user)
            return current_user.return_all_user_locations()
        except Exception as e:
            print(e)
            return {'message': 'Something went wrong'}, 500


delete_locations_paresr = parser.copy()
delete_locations_paresr.add_argument('ids', type=int, action='append', required=True)


class DeleteLocations(Resource):
    @jwt_required()
    def delete(self):
        try:
            user = get_jwt_identity()
            data = delete_locations_paresr.parse_args()
            ids = data['ids']

            current_user: UserModel = UserModel.find_by_username(user)
            current_user.delete_locations_from_user(ids)
            return {'message': 'Successfully removed location from favorites.'}, 200

        except Exception as e:
            print(e)
            return {'message': 'Something went wrong'}, 500


class UserLogoutAccess(Resource):
    @jwt_required()
    def post(self):
        jti = get_jwt()['jti']
        try:
            revoked_token = RevokeTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class UserLogoutRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        jti = get_jwt()['jti']
        try:
            revoked_token = RevokeTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Refresh token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class TokenRefresh(Resource):
    @jwt_required(refresh=True, locations='cookies')
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        csrf_access_token = get_csrf_token(access_token)

        response = make_response({
            'access_token': access_token,
            'csrf_access_token': csrf_access_token
        }, 200)
        set_access_cookies(response, access_token)

        return response


class AllUsers(Resource):
    def get(self):
        return UserModel.return_all()

    def delete(self):
        return UserModel.delete_all()
