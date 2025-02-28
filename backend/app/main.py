from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from database import Base, engine
from routes import users, funds, portfolio
from tasks import schedule_updates

app = FastAPI()

# Initialize FastAPI app
app = FastAPI()

# Base.metadata.drop_all(bind=engine)
# Create database tables (if not created)
Base.metadata.create_all(bind=engine)


# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(funds.router, prefix="/funds", tags=["Mutual Funds"])
app.include_router(portfolio.router, prefix="/portfolio", tags=["Portfolio"])

# Background task to update portfolio investment values
@app.on_event("startup")
def start_background_tasks():
    background_tasks = BackgroundTasks()
    schedule_updates(background_tasks)

# Uvicorn entry point
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
