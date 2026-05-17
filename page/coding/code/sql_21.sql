IF EXISTS (
    SELECT
        *
    FROM tempdb.sys.tables
    WHERE name LIKE '%#table%'
) BEGIN DROP TABLE #table END