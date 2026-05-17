SELECT
	a.column_1,
	a.column_2,
	b.column_3
FROM database.schema.table_1 AS a
LEFT JOIN database.schema.table_2 AS b
	ON b.column = a.column