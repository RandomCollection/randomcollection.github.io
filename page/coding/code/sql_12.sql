WITH
    cte_1 AS (
        SELECT
            *
        FROM database.schema.table_1
    )
    [, cte_2 AS (
        SELECT
            *
        FROM database.schema_table_2
    )]
SELECT
    *
FROM cte_1
[LEFT JOIN cte_2]
    ON cte_2.column_1 = cte_1.column_1]