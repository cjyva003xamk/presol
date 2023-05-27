-- CreateTable
CREATE TABLE "Journey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departure" TEXT NOT NULL,
    "return" TEXT NOT NULL,
    "departureStationId" INTEGER NOT NULL,
    "departureStationName" TEXT NOT NULL,
    "returnStationId" INTEGER NOT NULL,
    "returnStationName" TEXT NOT NULL,
    "coveredDistance" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL
);
