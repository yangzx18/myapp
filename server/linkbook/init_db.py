import sqlite3

def init_db(dbpath):
    # 先删除文件
    db = sqlite3.connect('linkbook.db')
    with open(dbpath, mode='r') as f:
        db.executescript(f.read())
        db.execute('insert into kind_table values(?,?,?)',['默认',0,0])
    db.commit()
    db.close()

if __name__ == '__main__':
    init_db('create.sql')