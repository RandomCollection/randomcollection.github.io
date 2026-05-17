proc sql;
	create table top_ten as
	select
		*
	from <libname>.<table>(obs=10);
quit;