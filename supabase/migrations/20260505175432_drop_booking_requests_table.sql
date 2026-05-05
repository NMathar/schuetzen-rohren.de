/*
  # Drop booking_requests table

  Removes the booking_requests table entirely as bookings are now handled
  as a client-side form only (no database persistence needed).

  1. Changes
    - Drop table `booking_requests` including its RLS policies
*/

DROP TABLE IF EXISTS booking_requests;