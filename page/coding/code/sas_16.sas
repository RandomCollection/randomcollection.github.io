proc sql;
	create table data as
	select
		date,
		id
	from <libname>.<table>(
		where=(
			<variable> like '%' || <text> || '%'
		)
	);
quit;