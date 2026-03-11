import { Handler } from "@netlify/functions";
import { neon } from "@netlify/neon";
import nodemailer from "nodemailer";

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

    // Configurar Nodemailer para enviar correos
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        // 1. Correo para Carles (Notificación de nueva reserva)
        await transporter.sendMail({
          from: `"Carles Mecànica Web" <${process.env.GMAIL_USER}>`,
          to: "carles.bikeworks@gmail.com",
          subject: `Nueva reserva de taller: ${name}`,
          html: `
            <h2>¡Tienes una nueva reserva en el taller!</h2>
            <p><strong>Cliente:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Tipo de bici:</strong> ${bikeType}</p>
            <p><strong>Fecha:</strong> ${date}</p>
            <p><strong>Hora:</strong> ${time}</p>
            <p><strong>Descripción:</strong> ${description || 'No especificada'}</p>
          `,
        });

        // 2. Correo para el Cliente (Confirmación)
        await transporter.sendMail({
          from: `"Carles Mecànica & Ciclisme" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: "Confirmación de reserva - Carles Mecànica & Ciclisme",
          html: `
            <h2>¡Hola ${name}!</h2>
            <p>Tu reserva en <strong>Carles Mecànica & Ciclisme</strong> ha sido confirmada correctamente.</p>
            <h3>Detalles de tu cita:</h3>
            <ul>
              <li><strong>Fecha:</strong> ${date}</li>
              <li><strong>Hora:</strong> ${time}</li>
              <li><strong>Tipo de bici:</strong> ${bikeType}</li>
              <li><strong>Servicio:</strong> ${description || 'Revisión general'}</li>
            </ul>
            <p>Si necesitas modificar o cancelar tu cita, por favor contáctanos por WhatsApp al <strong>+34 614 08 54 16</strong>.</p>
            <p>¡Te esperamos!</p>
            <br/>
            <p><strong>Carles Mecànica & Ciclisme</strong><br/>
            Carrer Gómez Ferrer, 40, 46220 Picassent, Valencia</p>
          `,
        });
        
        console.log("Emails enviados correctamente");
      } catch (emailError) {
        console.error("Error al enviar los correos:", emailError);
        // No bloqueamos la respuesta si falla el correo, la reserva ya está guardada
      }
    } else {
      console.warn("Faltan las variables GMAIL_USER o GMAIL_APP_PASSWORD. No se enviaron correos.");
    }

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
