SELECT
    column_1,
    column_2,
    COUNT(*) AS cnt
FROM database.schema.table
GROUP BY
    column_1,
    column_2
HAVING COUNT(*) > 1