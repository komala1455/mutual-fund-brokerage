from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://mylocaldb:mutual123@localhost/mutual_funds_brokerages")
engine = create_engine(DATABASE_URL, connect_args={"options": "-csearch_path=mf_schema"})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base(metadata=MetaData(schema="public"))

