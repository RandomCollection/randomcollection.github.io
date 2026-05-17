%macro export_xlsx(data);
	proc export
		data=&data.
		dbms=xlsx
		outfile="&path."
		replace;
	run;
%mend export_xlsx;

%export_xlsx(<data>);