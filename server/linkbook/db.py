import sqlite3


def get_links(con,kind_name):
    links = con.execute("select * from link_table where kind_name=(?) order by _order",[kind_name]).fetchall()
    return links

def add_link(con,name,url,kind_name):
    is_exists = con.execute("select link_name from link_table where kind_name=(?) and link_name=(?)",[kind_name,name]).fetchall()
    if len(is_exists) > 0:
        return "is_exists"

    count = con.execute('select link_count from kind_table where kind_name=(?)',[kind_name]).fetchall()[0][0]
    # print("{},{}".format(count,type(count)))
    con.execute("insert into link_table values(?,?,?,?)",[name,url,kind_name,count])
    # print(name,url,kind_name,count)
    con.execute("update kind_table set link_count=link_count+1 where kind_name=(?)",[kind_name])
    con.commit()

def change_link(con,name,url,kind_name,order):
    con.execute("update link_table set link_name=(?),link_url=(?) where _order=(?) and kind_name=(?)",[name,url,order,kind_name])
    con.commit()
    pass

def delete_link(con,kind_name,name,order):
    con.execute("delete from link_table where kind_name=(?) and link_name=(?) and _order=(?)",[kind_name,name,order])
    ## 将后面的order-1
    con.execute("update link_table set _order=_order-1 where _order>(?) and kind_name=(?)",[order,kind_name])
    con.execute("update kind_table set link_count=link_count-1 where kind_name=(?)",[kind_name])
    con.commit()
    pass

def up_link(con,name,kind_name,order):
    ## 前移
    ## 传入的name,kind_name,order都要准确，不然会打乱数据，down_link同样
    if order == 0:
        return 

    con.execute("update link_table set _order=_order+1 where kind_name=(?) and _order=(?)",[kind_name,order-1])
    con.execute("update link_table set _order=_order-1 where kind_name=(?) and link_name=(?)",[kind_name,name])
    con.commit()
    pass

def down_link(con,name,kind_name,order):
    count = con.execute('select link_count from kind_table where kind_name=(?)',[kind_name]).fetchall()[0][0]
    if order > count-2:
        return 
    ### order会冲突
    con.execute("update link_table set _order=_order-1 where kind_name=(?) and _order=(?)",[kind_name,order+1])
    con.execute("update link_table set _order=_order+1 where kind_name=(?) and link_name=(?)",[kind_name,name])
    con.commit()
    
    pass



def get_kinds(con):
    kinds = con.execute('select * from kind_table order by _order').fetchall()

    return kinds

def add_kind(con,kind_name):

    ## 增加防重复
    is_exists = con.execute("select kind_name from kind_table where kind_name=(?)",[kind_name]).fetchall()
    if len(is_exists) > 0:
        return "is exists"

    kind_count = con.execute("select kind_name from kind_table").fetchall()
    kind_count = len(kind_count)
    con.execute("insert into kind_table values(?,?,?)",[kind_name,kind_count,0])
    con.commit()

    pass

def rename_kind(con,kind_name,old_name):
    con.execute("update kind_table set kind_name=(?) where kind_name=(?)",[kind_name,old_name])
    con.execute("update link_table set kind_name=(?) where kind_name=(?)",[kind_name,old_name])
    con.commit()
    pass

def delete_kind(con,kind_name,order):
    _sql = '''
        delete from kind_table where kind_name=(?);
        delete from link_table where kind_name=(?);
    '''
    con.execute("delete from kind_table where kind_name=(?)",[kind_name])
    ## 将删除位置后面的往前一个位置
    con.execute("update kind_table set _order=_order-1 where _order>(?)",[order])
    con.execute("delete from link_table where kind_name=(?)",[kind_name])
    con.commit()
    pass

def up_kind(con,kind_name,order):
    if order == 0:
        return 

    con.execute("update kind_table set _order=_order+1 where _order=(?)",[order-1])
    con.execute("update kind_table set _order=_order-1 where kind_name=(?)",[kind_name])
    con.commit()

    pass

def down_kind(con,kind_name,order):
    count = con.execute('select kind_name from kind_table').fetchall()
    count = len(count)

    if order > count-2:
        return 
    ### order会冲突
    con.execute("update kind_table set _order=_order-1 where _order=(?)",[order+1])
    con.execute("update kind_table set _order=_order+1 where kind_name=(?)",[kind_name])
    con.commit()
    
    pass