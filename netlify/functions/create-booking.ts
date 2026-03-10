import { Handler } from "@netlify/functions";
import { neon } from "@netlify/neon";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const { name, email, phone, bikeType, description, date, time } = data;

    const sql = neon();

    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        bike_type VARCHAR(100) NOT NULL,
        description TEXT,
        booking_date DATE NOT NULL,
        booking_time VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const result = await sql`
      INSERT INTO bookings (name, email, phone, bike_type, description, booking_date, booking_time)
      VALUES (${name}, ${email}, ${phone}, ${bikeType}, ${description}, ${date}, ${time})
      RETURNING *
    `;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Reserva creada con éxito", booking: result[0] }),
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Error al guardar la reserva en la base de datos" }),
    };
  }
};
