-- CreateTable
CREATE TABLE "calendar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_entry" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMPTZ NOT NULL,
    "duration" INTEGER NOT NULL,
    "end" TIMESTAMPTZ NOT NULL,
    "id_calendar" INTEGER NOT NULL,

    CONSTRAINT "calendar_entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "calendar_id_key" ON "calendar"("id");

-- AddForeignKey
ALTER TABLE "calendar_entry" ADD CONSTRAINT "calendar_entry_id_calendar_fkey" FOREIGN KEY ("id_calendar") REFERENCES "calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
