from __main__ import db
from passlib.hash import pbkdf2_sha256 as sha256

from dataclasses import dataclass

import sqlalchemy as sa
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from sqlalchemy import ForeignKey
from sqlalchemy import select

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
        def users_data_to_json(user):
            return{
                'id' : user.id,
                'username': user.username,
                'password': user.password,
                'locations': LocationModel.return_all_from_user(user.id)
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

class LocationModel(db.Model):

    __tablename__ = 'locations'

    id: Mapped[int] = mapped_column(primary_key = True, unique= True)
    latitude: Mapped[Optional[float]] = mapped_column()
    longitude: Mapped[Optional[float]] = mapped_column()
    city: Mapped[Optional[str]] = mapped_column()
    province: Mapped[Optional[str]] = mapped_column()
    country: Mapped[Optional[str]] = mapped_column()
    sa.UniqueConstraint(latitude,longitude)
    sa.UniqueConstraint(city,province,country)

    user_id: Mapped[int] = mapped_column(ForeignKey(UserModel.id))
    user: Mapped["UserModel"] = relationship(back_populates="locations")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod 
    def return_all_from_user(cls,user_id):
        query = select(
            cls.id,
            cls.latitude,
            cls.longitude,
            cls.city,
            cls.province,
            cls.country
        ).where(cls.user_id == user_id)
        result = db.session.execute(query).all()
        locations = []
        for location in result:
            locations.append({
                'id': location.id,
                'latitude': location.latitude,
                'longitude': location.longitude,
                'city' : location.city,
                'province': location.province,
                'country' : location.country
            })

        return {'locations': locations}


class RevokeTokenModel(db.Model):
    
    __tablename__ = 'revoked_tokens'

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

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


