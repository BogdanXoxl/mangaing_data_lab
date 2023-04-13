-- CreateEnum
CREATE TYPE "sex" AS ENUM ('m', 'w');

-- CreateTable
CREATE TABLE "drivers" (
    "id" DECIMAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "phone" TEXT NOT NULL,
    "sex" "sex" NOT NULL,
    "salary" SMALLINT NOT NULL DEFAULT 0,
    "exp" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passengers" (
    "id" DECIMAL NOT NULL,
    "name" TEXT NOT NULL,
    "passport" BIGINT NOT NULL,

    CONSTRAINT "passengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "station_id" INTEGER NOT NULL,
    "train_id" DECIMAL NOT NULL,
    "pause" SMALLINT NOT NULL DEFAULT 0,
    "start_time" TIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "distance" SMALLINT NOT NULL DEFAULT 0,
    "station_form" TEXT NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" DECIMAL NOT NULL,
    "passenger_id" DECIMAL NOT NULL,
    "train_id" DECIMAL NOT NULL,
    "car_code" DECIMAL NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driver_id" DECIMAL NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trains" (
    "id" DECIMAL NOT NULL,
    "destination" TEXT NOT NULL,
    "time" TIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trains_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_train_code_fkey" FOREIGN KEY ("train_id") REFERENCES "trains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_driver_code_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_passenger_code_fkey" FOREIGN KEY ("passenger_id") REFERENCES "passengers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_train_code_fkey" FOREIGN KEY ("train_id") REFERENCES "trains"("id") ON DELETE CASCADE ON UPDATE CASCADE;
