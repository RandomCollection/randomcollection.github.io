%let data = data;
%let col = col;

proc sql;
	create table duplicates as
	select
		a.*,
		b.cnt
	from &data. as a
	inner join (
		select
			&col.,
			count(*) as cnt
		from &data.
		group by
			&col.
		having count(*) > 1
	) as b
		on b.&col. = a.&col.
	where b.cnt ne .
	order by
		&col.;
quit;