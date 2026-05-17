SELECT
    *
FROM (
    SELECT
        column_pivoted_non,
        column_pivoted_first AS column_1,
        column_pivoted_second AS column_2
    FROM database.schema.table
) AS a
PIVOT (
    aggregation_function(column_being_aggregated)
    FOR column_that_contains_the_values_that_will_become_column_headers IN (
        [column_pivoted_first], [column_pivoted_second]
    )
) AS b