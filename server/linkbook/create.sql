create table link_table(
	link_name text not null,
	link_url text not null,
	kind_name text not null,
    _order INTEGER not null
);
create table kind_table(
	kind_name text not null,
	_order INTEGER not null,
	link_count INTEGER not null
);