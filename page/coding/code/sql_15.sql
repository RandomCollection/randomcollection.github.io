SELECT
    *
FROM (
    SELECT
        column_group,
        column_value,
        column_contents,
        MAX(column_value) OVER (PARTITION BY column_group) AS column_value_max
    FROM database.schema.table
) AS a
WHERE a.column_value = a.column_value_max