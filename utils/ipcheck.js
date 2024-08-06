app.post('/api/submit-claim', authenticateUser, async (req, res) => {
    const { claimantAddress, projectName, scammerAddress, ...otherData } = req.body;
    const userIp = req.ip;
  
    try {
      // Check if user has already submitted a claim for this project or scammer
      const existingClaim = await ClaimModel.findOne({
        claimantAddress,
        $or: [{ projectName }, { scammerAddress }]
      });
  
      if (existingClaim) {
        return res.status(400).json({ message: 'You have already submitted a claim for this project or scammer.' });
      }
  
      // Check if there's a claim from this IP for this project or scammer
      const existingIpClaim = await ClaimModel.findOne({
        userIp,
        $or: [{ projectName }, { scammerAddress }]
      });
  
      if (existingIpClaim) {
        return res.status(400).json({ message: 'A claim for this project or scammer has already been submitted from your location.' });
      }
  
      // If all checks pass, create and save the new claim
      const newClaim = new ClaimModel({
        claimantAddress,
        userIp,
        projectName,
        scammerAddress,
        ...otherData
      });
  
      await newClaim.save();
  
      res.status(201).json({ message: 'Claim submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while submitting the claim' });
    }
  });