-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "nmstudent" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'Aluno2024!',
    "parentemail" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "classId" TEXT,
    CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("uuid") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("classId", "created_at", "email", "nmstudent", "parentemail", "updated_at", "uuid") SELECT "classId", "created_at", "email", "nmstudent", "parentemail", "updated_at", "uuid" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE TABLE "new_Teacher" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "nmteacher" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'Professor2024!',
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Teacher" ("admin", "created_at", "email", "nmteacher", "updated_at", "uuid") SELECT "admin", "created_at", "email", "nmteacher", "updated_at", "uuid" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
