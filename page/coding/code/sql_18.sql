SELECT
    column_name,
    data_type
FROM database.information_schema.columns
WHERE table_name = 'table_name'