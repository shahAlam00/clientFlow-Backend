import Client from "./client.model.js";

// Helper Function: Generate Client ID based on Name Initials (e.g., "Shah Alam" -> Sh-01)
const generateClientId = async (clientName) => {
  if (!clientName) return "CL-01";
  
  const trimmed = clientName.trim();
  // Pehle 2 letters nikalein aur capitalize karein (e.g., "sh" -> "Sh")
  const firstLetter = trimmed.charAt(0).toUpperCase();
  const secondLetter = trimmed.charAt(1) ? trimmed.charAt(1).toLowerCase() : 'x';
  const prefix = `${firstLetter}${secondLetter}`;

  // Check karein database mein is prefix ke kitne clients pehle se hain
  const count = await Client.countDocuments({ clientId: new RegExp(`^${prefix}-`, 'i') });
  const sequence = String(count + 1).padStart(2, '0');

  return `${prefix}-${sequence}`;
};

// @desc    Get all clients (with optional search/filtering)
// @route   GET /api/clients
export const getClients = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { clientName: { $regex: search, $options: "i" } },
        { personalPhone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { clientId: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.projectStatus = status;
    }

    const clients = await Client.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single client by ID
// @route   GET /api/clients/:id
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create / Onboard a new client
// @route   POST /api/clients
export const createClient = async (req, res) => {
  try {
    if (req.file) {
      req.body.profileImage = `/uploads/${req.file.filename}`;
    }

    // Automatically generate custom Client ID if clientName is provided
    if (req.body.clientName) {
      req.body.clientId = await generateClientId(req.body.clientName);
    }

    const newClient = await Client.create(req.body);

    res.status(201).json({
      success: true,
      message: "Client successfully onboarded!",
      data: newClient,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update client details
// @route   PUT /api/clients/:id
export const updateClient = async (req, res) => {
  try {
    if (req.file) {
      req.body.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    res.status(200).json({
      success: true,
      message: "Client details updated successfully",
      data: updatedClient,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete client record
// @route   DELETE /api/clients/:id
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    res.status(200).json({
      success: true,
      message: "Client record successfully deleted",
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};