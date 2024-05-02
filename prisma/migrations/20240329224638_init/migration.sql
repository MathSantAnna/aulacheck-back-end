-- CreateTable
CREATE TABLE "Teacher" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "nmteacher" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
