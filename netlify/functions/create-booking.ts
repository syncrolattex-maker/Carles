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
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
            </style>
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #000000; color: #ffffff;">
              <h2 style="font-family: 'Barlow Condensed', sans-serif; font-size: 32px; font-weight: 700; text-transform: uppercase; color: #ffffff; border-bottom: 2px solid #00FF88; padding-bottom: 10px; margin-top: 0; letter-spacing: 1px;">NUEVA RESERVA 🚲</h2>
              
              <div style="border: 1px solid #333333; padding: 20px; margin-top: 25px;">
                <p style="margin: 12px 0; color: #cccccc; font-size: 14px; letter-spacing: 0.5px;">CLIENTE: <strong style="color: #ffffff; font-size: 16px;">${name}</strong></p>
                <p style="margin: 12px 0; color: #cccccc; font-size: 14px; letter-spacing: 0.5px;">EMAIL: <a href="mailto:${email}" style="color: #00FF88; text-decoration: none; font-weight: 600;">${email}</a></p>
                <p style="margin: 12px 0; color: #cccccc; font-size: 14px; letter-spacing: 0.5px;">TELÉFONO: <a href="tel:${phone}" style="color: #00FF88; text-decoration: none; font-weight: 600;">${phone}</a></p>
                <p style="margin: 12px 0; color: #cccccc; font-size: 14px; letter-spacing: 0.5px;">BICI: <strong style="color: #ffffff; font-size: 16px;">${bikeType}</strong></p>
                <p style="margin: 12px 0; color: #cccccc; font-size: 14px; letter-spacing: 0.5px;">FECHA: <strong style="color: #ffffff; font-size: 16px;">${date}</strong></p>
                <p style="margin: 12px 0; color: #cccccc; font-size: 14px; letter-spacing: 0.5px;">HORA: <strong style="color: #ffffff; font-size: 16px;">${time}</strong></p>
              </div>
              
              <div style="border: 1px solid #333333; padding: 20px; margin-top: 20px; background-color: #111111;">
                <p style="margin: 0; color: #999999; font-family: 'Barlow Condensed', sans-serif; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">DESCRIPCIÓN / PROBLEMA</p>
                <p style="margin: 15px 0 0 0; color: #ffffff; line-height: 1.6; font-size: 15px;">"${description || 'No especificada'}"</p>
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
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
            </style>
            <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #000000; color: #ffffff;">
              <div style="padding: 40px 20px; text-align: center; border-bottom: 2px solid #00FF88;">
                <h1 style="font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 700; letter-spacing: 2px; margin: 0; text-transform: uppercase; color: #ffffff;">BIKESHOP</h1>
                <p style="font-family: 'Inter', sans-serif; font-size: 12px; letter-spacing: 3px; color: #999999; text-transform: uppercase; margin: 10px 0 0 0;">CARLES MECÀNICA & CICLISME</p>
              </div>
              
              <div style="padding: 40px 20px;">
                <h2 style="font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 600; margin-top: 0; text-transform: uppercase; color: #ffffff; letter-spacing: 1px;">CHOOSE YOUR PATH, ${name}</h2>
                <p style="color: #cccccc; font-size: 16px; line-height: 1.6;">Tu reserva en nuestro taller ha sido confirmada. Estamos listos para dejar tu bicicleta a punto.</p>
                
                <div style="border: 1px solid #333333; padding: 25px; margin: 35px 0;">
                  <h3 style="font-family: 'Barlow Condensed', sans-serif; font-size: 22px; margin-top: 0; text-transform: uppercase; color: #00FF88; letter-spacing: 1px;">DETALLES DE TU CITA</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #999999; width: 100px; font-size: 14px; letter-spacing: 1px;">FECHA</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #ffffff; font-weight: 600; font-size: 16px;">${date}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #999999; font-size: 14px; letter-spacing: 1px;">HORA</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #ffffff; font-weight: 600; font-size: 16px;">${time}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #999999; font-size: 14px; letter-spacing: 1px;">BICI</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #ffffff; font-size: 16px;">${bikeType}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; color: #999999; font-size: 14px; letter-spacing: 1px;">SERVICIO</td>
                      <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">${description || 'Revisión general'}</td>
                    </tr>
                  </table>
                </div>
                
                <p style="color: #cccccc; font-size: 15px; line-height: 1.6; padding: 20px; border-left: 3px solid #FF4040; background-color: #111111;">
                  Si necesitas modificar o cancelar tu cita, por favor contáctanos por WhatsApp al <a href="https://wa.me/34614085416" style="color: #ffffff; font-weight: bold; text-decoration: underline;">+34 614 08 54 16</a>.
                </p>
                
                <div style="margin-top: 50px; text-align: center;">
                  <a href="https://maps.google.com/?q=Carrer+Gómez+Ferrer,+40,+46220+Picassent,+Valencia" style="display: inline-block; padding: 16px 32px; background-color: #00FF88; color: #000000; text-decoration: none; font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">VER EN GOOGLE MAPS</a>
                </div>
                
                <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #333333; text-align: center;">
                  <p style="color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
                    Carrer Gómez Ferrer, 40, 46220 Picassent, Valencia
                  </p>
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
