import sqlite3


class DB:
    def __init__(self, db_conf):
        self.db_conf = db_conf
        self.is_close = True
        self.conn = sqlite3.connect(self.db_conf)
        self.cursor = self.conn.cursor()

    def get_conn(self):
        self.conn = sqlite3.connect(self.db_conf)
        self.cursor = self.conn.cursor()

    def insert(self, sql: str, params):
        if self.is_close:
            self.get_conn()
        self.cursor.execute(sql % params)
        self.conn.commit()
