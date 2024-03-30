-- CreateTable
CREATE TABLE "Course" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "nmcourse" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Class" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "nmclass" TEXT NOT NULL,
    "graduarion" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "nmstudent" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "parentemail" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
