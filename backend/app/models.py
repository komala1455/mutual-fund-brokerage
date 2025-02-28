from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "user_data"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    portfolios = relationship("Portfolio", back_populates="user", cascade="all, delete")


class MutualFund(Base):
    __tablename__ = "mutual_funds"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    scheme_code = Column(Integer, nullable=False)
    isin_div_payout_isin_growth = Column(String, nullable=False)
    isin_div_reinvestment = Column(String, nullable=False)
    scheme_name = Column(String, nullable=False)
    net_asset_value = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    scheme_type = Column(String, nullable=False)
    scheme_category = Column(String, nullable=False)


class Portfolio(Base):
    __tablename__ = "portfolio"
    id  = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user_data.id", ondelete="CASCADE"), nullable=False)
    fund_id = Column(Integer, ForeignKey("mutual_funds.id", ondelete="CASCADE"), nullable=False)
    units = Column(Float, nullable=False)
    user = relationship("User", back_populates="portfolios")
    fund = relationship("MutualFund", backref="portfolios")

 
