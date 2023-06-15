from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DATABASE

class Message:
    def __init__(self, data):
        self.id = data['id']
        self.sender_id = data['sender_id']
        self.receiver_id = data['receiver_id']
        self.message = data['message']
        self.status = data['status']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @staticmethod
    def validate(data):
        if len(data['message'])<5:
            return False
        return True
    
    @classmethod
    def send(cls, data):
        query = """
            INSERT INTO messages (sender_id, receiver_id, message, ride_id)
            VALUES (%(sender_id)s, %(receiver_id)s, %(message)s, %(ride_id)s);
        """
        return connectToMySQL(DATABASE).query_db(query, data)