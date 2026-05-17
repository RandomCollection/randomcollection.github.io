%let list_dates =
"31DEC2024"d
"31DEC2025"d;

proc sql;
	create table data as
	select
		*
	from <libname>.<table>(
		where=(
			date in (&list_dates.)
		)
	);
quit;