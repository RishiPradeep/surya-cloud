const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const path = require("path");
const { CLIENT_RENEG_LIMIT } = require("tls");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
// To parse JSON data
app.use(express.json());
// To parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Define a route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/getPatientBooking", async (req, res) => {
  const { username } = req.body;
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        username: username,
      },
      include: {
        bookings: true,
      },
    });
    if (!patient) {
      res.status(404).send("Patient not found");
    }
    res.send(patient);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/getDoctorBooking", async (req, res) => {
  const { username } = req.body;
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        username: username,
      },
      include: {
        bookings: true,
      },
    });
    if (!doctor) {
      res.status(404).send("Doctor not found");
    }
    res.send(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/savePrescription", async (req, res) => {
  const { illness_desc, presc_medi, bookingid } = req.body;
  try {
    await prisma.booking.update({
      where: {
        id: bookingid,
      },
      data: {
        illness_desc: illness_desc,
        presc_medi: presc_medi,
      },
    });
    res.status(200).send("Data Updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/makeBooking", async (req, res) => {
  const {
    doctor_name,
    patient_name,
    date_appointment,
    full_name,
    email,
    illness,
    current_medication,
    status,
  } = req.body;
  try {
    await prisma.booking.create({
      data: {
        current_medication: current_medication,
        date_appointment: date_appointment,
        email: email,
        full_name: full_name,
        illness: illness,
        status: status,
        doctor_name: doctor_name,
        patient_name: patient_name,
      },
    });
    res.send("Booking Created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/patientLogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the patient exists and the password matches
    const patient = await prisma.patient.findUnique({
      where: {
        username: username,
      },
    });

    if (patient && patient.password === password) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/doctorLogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the patient exists and the password matches
    const patient = await prisma.doctor.findUnique({
      where: {
        username: username,
      },
    });

    if (patient && patient.password === password) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
