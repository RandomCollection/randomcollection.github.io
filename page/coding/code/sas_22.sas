%macro export_xlsx(data, worksheet);
	proc export
		data=&data.
		outfile="&path."
		dbms=xlsx replace;
		sheet=&worksheet.;
	run;
%mend export_xlsx;

%export_xlsx(<data>, "<worksheet>");