proc sql;
	create table duplicates as
	select
		date,
		id,
		count(*) as cnt
	from <libname>.<table>
	group by
		date,
		id
	having count(*) > 1;
quit;