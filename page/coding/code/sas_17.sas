%macro create_snapshots(dates);
	proc delete data=work.data_raw; run;
	%local i date;
	%do i = 1 %to %sysfunc(countw(&dates., %str( )));

		%let date = %scan(&dates., &i, %str( ));
		%let year_month = %sysfunc(year(&date.))_%sysfunc(putn(%sysfunc(month(&date.)), z2.));

		proc sql;
			create table data_&year_month. as
			select distinct
				&date. format=date9. as snapshot,
				*
			from <libname>.<table>(
				where=(
					<valid_from> <= &date.
					and <valid_to> >= &date.
				)
			)
			group by
				id
			having <priority_variable> = max(<priority_variable>);
		quit;
	
		proc append base=data_raw data=data_&year_month. force;
		run;
	%end;
%mend create_snapshots;

%create_snapshots(&list_dates.);