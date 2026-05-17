proc datasets nolist;
	copy in=work out=<libname_out> memtype=data;
	select
		<data_1>
		<data_2>;
run;