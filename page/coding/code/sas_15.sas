proc sort data=<data> out=<data>;
    by
	<id_1>
	<id_2>;
run;

proc transpose data=<data> out=<data>(drop=_name_);
    by
	<id_1>
	<id_2>;
    id <variable_row>;
    var <variable_column>;
run;