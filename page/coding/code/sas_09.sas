%macro upcase_columns(data);
	%let dsid=%sysfunc(open(&data.));
	%let num=%sysfunc(attrn(&dsid, nvars));
	%put &amp;num;
	data &amp;data.;
		set &data.(
			rename=(
				%do i = 1 %to &amp;num;
					%let var&i=%sysfunc(varname(&dsid, &i));
					&&var&i=%sysfunc(upcase(&&var&i))
				%end;
			)
		);
	%let close=%sysfunc(close(&dsid));
	run;
%mend upcase_columns;

%upcase_columns(<data>);