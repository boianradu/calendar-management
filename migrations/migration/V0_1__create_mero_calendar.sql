CREATE TABLE IF NOT EXISTS calendar.Calendar (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    PRIMARY KEY (id),
    name text
)