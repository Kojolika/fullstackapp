from __main__ import db
from passlib.hash import pbkdf2_sha256 as sha256

from dataclasses import dataclass

import sqlalchemy as sa
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import composite, mapped_column
from sqlalchemy import ForeignKey

from typing import List
from typing import Optional


class UserModel(db.Model):
    
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(120), nullable = False)

    locations: Mapped[List["LocationModel"]] = relationship(back_populates= 'user')

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls,username):
        return cls.query.filter_by(username = username).first()
    
    @classmethod
    def return_all(cls):
        def location_data_to_json(locations):
            location_data = []
            for loc in locations:
                location_data.append({
                    'id': loc.id,
                    'city':loc.city,
                    'province': loc.province
            })
            return location_data
        
        def users_data_to_json(user):

            return{
                'id' : user.id,
                'username': user.username,
                'password': user.password,
                'locations': location_data_to_json(user.locations)
            }
        return {'users': list(map(lambda x: users_data_to_json(x), cls.query.all()))}
    
    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} row(s) deleted'.format(num_rows_deleted)}
        except:
            return {'message': 'Something went wrong'}
        
    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)
    
    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)

@dataclass
class Coordinates():
    lat: float
    long: float

class LocationModel(db.Model):

    __tablename__ = 'location'

    id = db.Column(db.Integer, primary_key=True)

    coordinates: Mapped[Coordinates] = composite(mapped_column("lat"),mapped_column("long"))
    city: Mapped[Optional[str]] = mapped_column()
    province: Mapped[Optional[str]] = mapped_column()

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["UserModel"] = relationship(back_populates="locations")

    def add(self):
        db.session.add(self)
        db.session.commit

class RevokeTokenModel(db.Model):
    
    __tablename__ = 'revoked_tokens'

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit

    @classmethod
    def is_jti_blacklisted(cls,jti):
        query = cls.query.filter_by(jti = jti).first()
        return bool(query)
    
    @classmethod
    def return_all_tokens(cls):
        def to_json(x):
            return{
                'jti': x.jti
            }
        return {'tokens': list(map(lambda x: to_json(x), cls.query.all()))}


