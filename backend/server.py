print(f'Loading {__name__}')
from flask import Flask, jsonify
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager


front_end_url = 'http://localhost:3000'

app = Flask(__name__)
CORS(app, origins=front_end_url,supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 10

api = Api(app)

#'SQLALCHEMY_DATABASE_URI' defines the URL database url and is composed of 3 parts:
#    1. Dialect
#        -A Dialect defines the behavior of a specific database and DB-API combination.
#        - (This application uses 'sqlite')
#    2. DBAPI
#        -Specifies how it connects to the database.
#        -If not specified, a “default” DBAPI will be imported if available - this default is typically the most widely known driver available for that backend.
#        - (This application uses the default DBAPI)
#    3. Type of database
#        - for more info: https://docs.sqlalchemy.org/en/20/core/engines.html#backend-specific-urls
#        - (As SQLite connects to local files, the URL format is slightly different. 
#           The “file” portion of the URL is the filename of the database. 
#           For a relative file path, this requires three slashes: ///app.db )
#
# docs: https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'some-secret-string'

#SQLAlchemy docs: https://docs.sqlalchemy.org/en/20/index.html
#flask_SQLAlchemy docs: https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/quickstart/
db:SQLAlchemy = SQLAlchemy(app)

app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access','refresh']
app.config['JWT_TOKEN_LOCATION'] = ["headers", "cookies"]
app.config['JWT_COOKIE_SECURE'] = True
app.config['JWT_SESSION_COOKIE'] = False
app.config['JWT_ERROR_MESSAGE_KEY'] = 'message'
app.config['JWT_REFRESH_CSRF_HEADER_NAME'] = 'X-CSRF-REFRESH-TOKEN'
app.config['JWT_ACCESS_CSRF_HEADER_NAME'] = 'X-CSRF-ACCESS-TOKEN'

#app.config['JWT_COOKIE_DOMAIN'] = front_end_url

jwt = JWTManager(app)

@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(decrypted_token_header, decrypted_token_payload: dict):
    jti = decrypted_token_payload['jti']
    return models.RevokeTokenModel.is_jti_blacklisted(jti)

@jwt.expired_token_loader
def error_on_token_expire(jwt_header, jwt_payload):
    print(jwt_header)
    print(jwt_payload)
    return jsonify(status = "403", msg = "The token has expired"), 403

#db.create_all() creates the table schema defined in our database
#@app.before_first_request assigns this function to a list of functions that will be called at the beginning of the first request to this instance. 
@app.before_first_request
def create_tables():
    db.create_all()

#useful for testing
def delete_tables():
    db.drop_all()

with app.app_context():
    #delete_tables()
    test = 1

from auth import resources, models, air_visual_api_resources, accu_weather_api_resources

#adds endpoints (url destinations essentially) to the api
api.add_resource(resources.UserRegistration, '/registration')
api.add_resource(resources.UserLogin, '/login')
api.add_resource(resources.UserLogoutAccess, '/logout/access')
api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')
api.add_resource(resources.TokenRefresh, '/token/refresh')
api.add_resource(resources.AllUsers, '/users')
api.add_resource(resources.AddLocation, '/addLocation')
api.add_resource(resources.DeleteLocations, '/deleteLocations')
api.add_resource(resources.GetAllLocations, '/locations')

api.add_resource(air_visual_api_resources.GetWeatherDataFromCity, '/airVisualApi/weatherData')
api.add_resource(air_visual_api_resources.Countries, '/airVisualApi/countries')
api.add_resource(air_visual_api_resources.States, '/airVisualApi/states')
api.add_resource(air_visual_api_resources.Cities, '/airVisualApi/cities')

api.add_resource(accu_weather_api_resources.GetLocationKey, '/accuWeatherApi/locationKey')
api.add_resource(accu_weather_api_resources.GetDailyForecast,'/accuWeatherApi/dailyForecast')
api.add_resource(accu_weather_api_resources.GetDailyForecast5Days, '/accuWeatherApi/dailyForecast5Days')
api.add_resource(accu_weather_api_resources.GetHourlyForecast12Hours, '/accuWeatherApi/hourlyForecast12Hours')

if __name__ == "__main__":
    app.run(debug=True)

