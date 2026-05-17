proc sql;
	create table tables as
	select
		libname,
		memname,
		name
	from dictionary.columns
	where libname in ('<libname>')
	order by
		memname;
quit;