SELECT
    so.name,
    text
FROM sysobjects AS so,
syscomments AS sc
WHERE so.id = sc.id
AND UPPER(text) LIKE '%string_to_search%'