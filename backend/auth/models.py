from __main__ import db
from passlib.hash import pbkdf2_sha256 as sha256

import sqlalchemy as sa
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from sqlalchemy import ForeignKey
from sqlalchemy import select, update, Table, Column, insert

from typing import List
from typing import Optional

association_table = Table(
    "association_table",
    db.Model.metadata,
    Column("location_id", ForeignKey("locations.id")),
    Column("user_id",ForeignKey("users.id")),
    sa.UniqueConstraint("location_id", "user_id")
)

class LocationModel(db.Model):

    __tablename__ = 'locations'

    id: Mapped[int] = mapped_column(primary_key=True, unique=True)
    city: Mapped[Optional[str]] = mapped_column()
    province: Mapped[Optional[str]] = mapped_column()
    state_code: Mapped[Optional[str]] = mapped_column() 
    country: Mapped[Optional[str]] = mapped_column()
    iso2: Mapped[Optional[str]] = mapped_column() #country 2 letter code
    latitude: Mapped[Optional[float]] = mapped_column()
    longitude: Mapped[Optional[float]] = mapped_column()
    sa.UniqueConstraint(latitude, longitude)
    sa.UniqueConstraint(city, province, country)

    users: Mapped[Optional[List["UserModel"]]] = relationship(secondary=association_table,back_populates="locations")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def save_to_assoc_table(self, user):
        stmt = insert(association_table).values(user_id = user.id,location_id = self.id)
        db.session.execute(stmt)
        db.session.commit()


    @classmethod
    def does_location_already_exist(cls, city, province, country):
        query = select(cls).where(cls.city == city, cls.province == province, cls.country == country)
        result = db.session.execute(query).first()


        if (result == None):
            return False
        
        return result[0]


class UserModel(db.Model):

    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column()

    locations: Mapped[Optional[List["LocationModel"]]] = relationship(secondary=association_table,back_populates="users")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def return_all_user_locations(self):
        query = select(LocationModel).join(association_table)
        result = db.session.execute(query).all()
        locations = []
        for location in result:
            loc = location[0]
            locations.append({
                'id': loc.id,
                'latitude': loc.latitude,
                'longitude': loc.longitude,
                'city': loc.city,
                'province': loc.province,
                'state_code': loc.state_code,
                'country': loc.country,
                'iso2': loc.iso2
            })

        return {'locations': locations} 

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def return_all(cls):
        def users_data_to_json(user):
            return {
                'id': user.id,
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

class RevokeTokenModel(db.Model):

    __tablename__ = 'revoked_tokens'

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)

    @classmethod
    def return_all_tokens(cls):
        def to_json(x):
            return {
                'jti': x.jti
            }
        return {'tokens': list(map(lambda x: to_json(x), cls.query.all()))}