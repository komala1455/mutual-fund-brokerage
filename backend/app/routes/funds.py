import requests
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from auth import get_current_user
from models import User
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

router = APIRouter()


class RapidFundAPI:
    def __init__(self):
        self.base_url = "https://latest-mutual-fund-nav.p.rapidapi.com/latest"
        self.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-rapidapi-ua": "RapidAPI-Playground",
            "x-rapidapi-key": "c23ad4a833mshc6797239c525743p1e798ajsne5a53e09c3e2",
            "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com"
        }

    def get_data(self, params):
        try:
            response = requests.get(self.base_url, headers=self.headers, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": f"Error fetching data: {e}"}

@router.get("/funds")
def get_funds(current_user: User = Depends(get_current_user)):
    api = RapidFundAPI()
    querystring = {"Scheme_Type": "Open"}
    data = api.get_data(params=querystring)
    print("data fetched records from RapidAPI", len(data))
    return data


@router.get("/mutual-funds/")
def get_mutual_funds(fund_name: str, fund_category: str = None, current_user: User = Depends(get_current_user)):
    api = RapidFundAPI()
    params = {"Scheme_Type": "Open"}
    if not fund_name:
        raise HTTPException(status_code=400, detail="Fund family is required")
    params['Mutual_Fund_Family'] = fund_name
    if fund_category:
        params["Scheme_Category"] = fund_category
    funds_info = api.get_data(params=params)
    return funds_info
