CREATE TABLE IF NOT EXISTS calendar.Calendar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    start TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER NOT NULL,
end TIMESTAMP WITH TIME ZONE NOT NULL,
id_calendar UUID,
CONSTRAINT fk_wallet FOREIGN KEY (id_calendar) REFERENCES calendar.Calendar(id_calendar) ON DELETE
SET NULL
);