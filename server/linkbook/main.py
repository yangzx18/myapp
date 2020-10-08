from flask import jsonify,Blueprint,request,g
from .db import *

linkbook_api = Blueprint('linkbook_links',__name__)

DB_PATH = 'linkbook/linkbook.db'
con = sqlite3.connect(DB_PATH,check_same_thread = False)

@linkbook_api.route('/links')
def links():
    kind_name = request.args.get("kindName")
    links = get_links(con,kind_name)
    
    return jsonify({
        "message": "ok",
        "data": links
    })


@linkbook_api.route('/links/add',methods=['POST'])
def _add_link():

    name = request.form['name']
    url = request.form['url']
    kind_name = request.form['kindName']

    res = add_link(con,name,url,kind_name)
    if(res == "is_exists"):
        return jsonify({
        "message": "书签已存在"
    })

    return jsonify({
        "message": "ok"
    })

@linkbook_api.route('/links/up',methods=['POST'])
def _up_link():
    name = request.form['name']
    kind_name = request.form['kindName']
    order = int(request.form['order'])

    up_link(con,name,kind_name,order)
    return jsonify({
        "message": "ok"
    })
@linkbook_api.route('/links/down',methods=['POST'])
def _down_link():
    name = request.form['name']
    kind_name = request.form['kindName']
    order = int(request.form['order'])

    down_link(con,name,kind_name,order)
    return jsonify({
        "message": "ok"
    })
@linkbook_api.route('/links/change',methods=['POST'])
def _change_link():
    name = request.form['name']
    url = request.form['url']
    kind_name = request.form['kindName']
    order = int(request.form['order'])
    is_change_kind = request.form['changeKind']
    if is_change_kind == "true":
        old_kind_name = request.form['oldKindName']
        add_res = add_link(con,name,url,kind_name)
        if  add_res == "is_exists":
            return jsonify({
                "message": "所移动分类已存在同名书签"
            }) 
        else:
            delete_link(con,old_kind_name,name,order)

    else:
        change_link(con,name,url,kind_name,order)

    return jsonify({
        "message": "ok"
    })


@linkbook_api.route('/links/delete',methods=['POST'])
def _delete_link():
    kind_name = request.form['kindName']
    order = request.form['order']
    name = request.form['name']
    delete_link(con,kind_name,name,order)

    return jsonify({
        "message": "ok"
    })

@linkbook_api.route('/kinds')
def kinds():

    links = get_kinds(con)
    
    return jsonify({
        "message": "ok",
        "data": links
    })

@linkbook_api.route('/kinds/add',methods=['POST'])
def _add_kind():
    kind_name = request.form['kindName']

    res = add_kind(con,kind_name)
    if res == "is exists":
        return jsonify({
        "message": "分类已存在"
    })
    return jsonify({
        "message": "ok",
        "data": kind_name
    })
@linkbook_api.route('/kinds/delete',methods=['POST'])
def _delete_kind():
    kind_name = request.form['kindName']
    order = request.form['order']
    delete_kind(con,kind_name,order)

    return jsonify({
        "message": "ok",
        "data": kind_name
    })

@linkbook_api.route('/kinds/up',methods=['POST'])
def _up_kind():
    kind_name = request.form['kindName']
    order = int(request.form['order'])

    up_kind(con,kind_name,order)

    return jsonify({
        "message": "ok",
        "data": kind_name
    })
@linkbook_api.route('/kinds/rename',methods=['POST'])
def _rename_kind():
    kind_name = request.form['kindName']
    old_name = request.form['oldName']
    rename_kind(con,kind_name,old_name)

    return jsonify({
        "message": "ok",
        "data": kind_name
    })

@linkbook_api.route('/kinds/down',methods=['POST'])
def _down_kind():
    kind_name = request.form['kindName']
    order = int(request.form['order'])

    down_kind(con,kind_name,order)

    return jsonify({
        "message": "ok",
        "data": kind_name
    })


