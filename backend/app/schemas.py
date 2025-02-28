from pydantic import BaseModel, EmailStr
from typing import List

# User Schema
class UserCreate(BaseModel):
    email: EmailStr
    password: str  # Fixed: Remove id, as it's auto-generated


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True  # Enables ORM mode for SQLAlchemy


# Token Schema (for authentication)
class Token(BaseModel):
    access_token: str
    token_type: str


# Mutual Fund Schema
class MutualFundBase(BaseModel):
    name: str
    scheme_code: int
    isin_div_payout_isin_growth: str
    isin_div_reinvestment: str
    scheme_name: str
    net_asset_value: float
    date: str
    scheme_type: str
    scheme_category: str
    amount: float

class MutualFundCreate(MutualFundBase):
    pass


class MutualFundResponse(MutualFundBase):
    id: int

    class Config:
        from_attributes = True


# Portfolio Schema
class PortfolioCreate(BaseModel):
    user_id: int
    fund_id: int
    units: float


class PortfolioResponse(BaseModel):
    id: int
    user_id: int
    fund_id: List[MutualFundResponse]
    units: float

    class Config:
        from_attributes = True
