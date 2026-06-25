import os
import pymysql

def get_db_connection():
    # Pure local development connection
    instance_connection_name = os.environ.get('INSTANCE_CONNECTION_NAME')
    
    if instance_connection_name:
        # Production Environment: Cloud Run UNIX Socket Connection
        return pymysql.connect(
            unix_socket=f"/cloudsql/{instance_connection_name}",
            user=os.environ.get('DB_USER'),
            password=os.environ.get('DB_PASSWORD'),
            db=os.environ.get('DB_NAME'),
            autocommit=True
        )
    else:
        # Local Development Environment: Standard TCP Connection
        # Make sure to define DB_HOST (usually '127.0.0.1') in your local .env file
        return pymysql.connect(
            host=os.environ.get('DB_HOST', '127.0.0.1'),
            port=int(os.environ.get('DB_PORT')),
            user=os.environ.get('DB_USER'),
            password=os.environ.get('DB_PASSWORD'),
            db=os.environ.get('DB_NAME'),
            autocommit=True
        )