from fastapi import BackgroundTasks
from sqlalchemy.orm import Session
import requests
from database import SessionLocal
from models import Portfolio, MutualFund
import os

def update_portfolio():
    db = SessionLocal()
    portfolios = db.query(Portfolio).all()
    for investment in portfolios:
        fund = db.query(MutualFund).filter(MutualFund.id == investment.fund_id).first()
        if fund:
            response = requests.get(f"https://latest-mutual-fund-nav.p.rapidapi.com/fund/{fund.id}")
            fund.nav = response.json().get("nav", fund.nav)
    db.commit()

def schedule_updates(background_tasks: BackgroundTasks):
    background_tasks.add_task(update_portfolio)
