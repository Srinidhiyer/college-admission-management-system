const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/admissiondb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.error(err));

// Schema and Model
const AdmissionSchema = new mongoose.Schema({
    yourname: { type: String, required: true },
    email: { type: String, required: true, match: /^[a-z0-9]{1,20}@gmail\.com$/ },
    phone: { type: String, required: true, match: /^\d{10}$/ },
    parentsMobile: { type: String, required: true, match: /^\d{10}$/ },
    address: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    branch: { type: String, required: true },
    quota: { type: String, required: true },
    sslcPercentage: { type: Number, min: 0, max: 100, required: true },
    pucPercentage: { type: Number, min: 0, max: 100, required: true },
    category: { type: String, required: true }
});

const Admission = mongoose.model('Admission', AdmissionSchema);

// API Route
app.post('/submitAdmission', async (req, res) => {
    try {
        const admissionData = new Admission(req.body);
        await admissionData.save();
        res.status(200).send({ message: 'Form data saved successfully!' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to save form data', details: err });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
