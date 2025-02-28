from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from models import Portfolio, MutualFund, User
from schemas import MutualFundCreate, MutualFundBase
from . import get_db

from auth import get_current_user

router = APIRouter()


@router.post("/")
def add_to_portfolio(portfolio: MutualFundCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    mutual_fund_obj = portfolio.dict()
    amount = mutual_fund_obj.pop('amount', 0)
    instance = MutualFund(**mutual_fund_obj)
    db.add(instance)
    db.commit()
    units = round(amount / instance.net_asset_value, 2)
    user_portfolio = Portfolio(user_id=current_user.id, fund_id=instance.id, units=units)
    db.add(user_portfolio)
    db.commit()
    return {
        "message": "Portfolio updated successfully",
        "portfolio_id": user_portfolio.id,
        "status_code": 201
    }

@router.get("/inventments/")
def view_portfolio(current_user: User = Depends(get_current_user), db: Session = Depends(get_db), response_model=List[MutualFundBase]):
    funds = (
        db.query(MutualFund)
        .join(Portfolio, MutualFund.id == Portfolio.fund_id)
        .filter(Portfolio.user_id == current_user.id)
        .all()
    )
    return funds