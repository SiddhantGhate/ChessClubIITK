# ChessClubIITK

# ♟️ Chess Club IITK - Developer Setup Guide

Welcome to the Sanctum! This guide will get your local development environment set up so you can safely write code and connect to our live cloud database without needing any passwords, JSON keys, or IP whitelisting.

## Prerequisites
Before you start, make sure you have the following installed on your machine:
* **Python 3.9+**
* **Node.js & npm**
* **Google Cloud CLI:** [Install it here](https://cloud.google.com/sdk/docs/install)
* **Cloud SQL Auth Proxy:** * **Mac (Homebrew):** Run `brew install cloud-sql-proxy`
  * **Mac (Direct Download if Brew fails):** ```bash
    curl -o cloud-sql-proxy [https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.22.1/cloud-sql-proxy.darwin.arm64](https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.22.1/cloud-sql-proxy.darwin.arm64)
    chmod +x cloud-sql-proxy
    ```
  * **Windows:** [Download the .exe here](https://cloud.google.com/sql/docs/mysql/connect-auth-proxy).

---

## 🚀 Setup Instructions

### Step 1: Clone the Repository
```bash
git clone [https://github.com/YOUR_TEAM_REPO/ChessClubIITK.git](https://github.com/YOUR_TEAM_REPO/ChessClubIITK.git)
cd ChessClubIITK
Step 2: Setup the Python Backend
Open a terminal in the backend folder and set up your virtual environment:

Bash
cd backend
python3 -m venv venv

# Mac/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

pip install -r requirements.txt
Create a .env file inside the backend folder and add these lines:

Code snippet
# Database (Connects to your local proxy tunnel)
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="db_user"
DB_NAME="user_auth_db"
DB_PASSWORD="<ASK_SIDDHANT_FOR_PASSWORD>"

# Email Setup for OTPs
EMAIL_SENDER="mysterymaninyourarea@gmail.com"
EMAIL_PASSWORD="<ASK_SIDDHANT_FOR_APP_PASSWORD>"
Step 3: Setup the React Frontend
Open a new terminal tab in the react-app folder:

Bash
cd react-app
npm install
🔐 The Magic Database Tunnel
We use Google's zero-key authentication. Instead of dealing with IP whitelists on the IITK Wi-Fi, you will log in through your browser to open a secure tunnel straight to the cloud database.

1. Log into Google Cloud
Run this in your terminal and log in with your authorized Google Account (ensure Siddhant has added this email to the IAM access list):

Bash
gcloud auth application-default login
2. Open the Tunnel
Keep a terminal window open in the background and run the proxy command:

Bash
# If installed via Homebrew or Windows .exe:
cloud-sql-proxy backend-499903:asia-south2:chessiitk-mysql-delhi-01

# If downloaded directly to your folder via curl:
./cloud-sql-proxy backend-499903:asia-south2:chessiitk-mysql-delhi-01
(If the terminal says Ready for new connections, you are successfully connected to the cloud database! Leave this running.)

🏃‍♂️ Running the App Daily
Whenever you sit down to code, you need three terminal tabs running:

The Proxy Tunnel: (See step above)

The Backend: ```bash
cd backend
source venv/bin/activate
python app.py

The Frontend:

Bash
cd react-app
npm run dev
Open http://localhost:5173 in your browser, and you're ready to build!