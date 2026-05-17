options compress=yes;
proc copy in=work out=<libname_out> memtype=data noclone;
	select <data>;
run;