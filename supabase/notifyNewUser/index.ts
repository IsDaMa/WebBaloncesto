// supabase/functions/notifyNewUser/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import nodemailer from "npm:nodemailer";

serve(async (req) => {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    // Configura tu SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.tu-servidor.com", // ej: smtp.gmail.com
      port: 587,
      auth: {
        user: "eramis@gmail.com",
        pass: "-#29To74To#-",
      },
    });

    // Enviar correo
    await transporter.sendMail({
      from: '"Mi App" <no-reply@miapp.com>',
      to: "eramis@gmail.com",
      subject: "Nuevo usuario registrado",
      text: `Se ha registrado un nuevo usuario:\nNombre: ${name}\nEmail: ${email}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
