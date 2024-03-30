-- CreateTable
CREATE TABLE "Classroom" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "presence" BOOLEAN NOT NULL,
    "period" INTEGER NOT NULL,
    CONSTRAINT "Classroom_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Classroom_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "nmteacher" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Teacher" ("created_at", "email", "nmteacher", "updated_at", "uuid") SELECT "created_at", "email", "nmteacher", "updated_at", "uuid" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
