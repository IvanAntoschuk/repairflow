-- Переводим существующие статусы в украинский, как их видит пользователь
UPDATE "Order"
SET "currentStatus" = CASE "currentStatus"
    WHEN 'new' THEN 'Нове'
    WHEN 'diagnostics' THEN 'Діагностика'
    WHEN 'in_progress' THEN 'В роботі'
    WHEN 'waiting_parts' THEN 'Очікує запчастини'
    WHEN 'ready' THEN 'Готово до видачі'
    WHEN 'completed' THEN 'Завершено'
END
WHERE "currentStatus" IN ('new', 'diagnostics', 'in_progress', 'waiting_parts', 'ready', 'completed');
