SELECT libellé, COUNT(*), AVG(durée_en_minutes) AS moyenne
FROM film
JOIN genre ON genre.id = film.genre_id
GROUP BY genre.libellé
ORDER BY genre.libellé DESC;