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
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
              <h2 style="color: #333; border-bottom: 2px solid #ff6600; padding-bottom: 10px;">¡Nueva reserva en el taller! 🚲</h2>
              <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <p style="margin: 10px 0;"><strong>👤 Cliente:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong>✉️ Email:</strong> <a href="mailto:${email}" style="color: #ff6600;">${email}</a></p>
                <p style="margin: 10px 0;"><strong>📞 Teléfono:</strong> <a href="tel:${phone}" style="color: #ff6600;">${phone}</a></p>
                <p style="margin: 10px 0;"><strong>🚲 Tipo de bici:</strong> ${bikeType}</p>
                <p style="margin: 10px 0;"><strong>📅 Fecha:</strong> ${date}</p>
                <p style="margin: 10px 0;"><strong>⏰ Hora:</strong> ${time}</p>
              </div>
              <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin-top: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <p style="margin: 0; color: #555;"><strong>📝 Descripción / Problema:</strong></p>
                <p style="margin: 10px 0 0 0; font-style: italic; color: #333;">"${description || 'No especificada'}"</p>
              </div>
            </div>
          `,
        });

        // 2. Correo para el Cliente (Confirmación)
        await transporter.sendMail({
          from: `"Carles Mecànica & Ciclisme" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: "Confirmación de reserva - Carles Mecànica & Ciclisme",
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
              <div style="background-color: #1a1a1a; padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">CARLES MECÀNICA & CICLISME</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #333333; margin-top: 0;">¡Hola ${name}! 👋</h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">Tu reserva en nuestro taller ha sido confirmada correctamente. Estamos listos para dejar tu bicicleta a punto.</p>
                
                <div style="background-color: #f8f9fa; border-left: 4px solid #ff6600; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                  <h3 style="margin-top: 0; color: #333333; font-size: 18px;">Detalles de tu cita</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #666666; width: 120px;"><strong>📅 Fecha:</strong></td>
                      <td style="padding: 8px 0; color: #333333; font-weight: bold;">${date}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;"><strong>⏰ Hora:</strong></td>
                      <td style="padding: 8px 0; color: #333333; font-weight: bold;">${time}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;"><strong>🚲 Tipo de bici:</strong></td>
                      <td style="padding: 8px 0; color: #333333;">${bikeType}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;"><strong>🔧 Servicio:</strong></td>
                      <td style="padding: 8px 0; color: #333333;">${description || 'Revisión general'}</td>
                    </tr>
                  </table>
                </div>
                
                <p style="color: #555555; font-size: 15px; line-height: 1.5; background-color: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeeba;">
                  ⚠️ <strong>Importante:</strong> Si necesitas modificar o cancelar tu cita, por favor contáctanos por WhatsApp al <a href="https://wa.me/34614085416" style="color: #856404; font-weight: bold; text-decoration: none;">+34 614 08 54 16</a> con la mayor antelación posible.
                </p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center;">
                  <p style="color: #333333; font-weight: bold; margin-bottom: 5px;">¡Te esperamos!</p>
                  <p style="color: #777777; font-size: 14px; margin-top: 0;">
                    <strong>Carles Mecànica & Ciclisme</strong><br/>
                    Carrer Gómez Ferrer, 40, 46220 Picassent, Valencia
                  </p>
                  <a href="https://maps.google.com/?q=Carrer+Gómez+Ferrer,+40,+46220+Picassent,+Valencia" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">📍 Ver en Google Maps</a>
                </div>
              </div>
            </div>
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
