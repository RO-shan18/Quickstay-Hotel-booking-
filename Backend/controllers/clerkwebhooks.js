import usermodel from "../models/usermodel.js";
import { Webhook } from "svix";

const clerkwebhooks = async (req, res) => {
  try {
    // create svix instance
    const whook = new Webhook(process.env.WEBHOOKS_SIGNING_SECRET); 

    // Getting headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    //verifying headers
    await whook.verify(JSON.stringify(req.body), headers);

    //Getting data from req boy
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    //switch case for different events
    switch (type) {
      case "user.created": {
        await usermodel.create(userData);
        break;
      }

      case "user.updated": {
        await usermodel.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await usermodel.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }

    res.json({ success: true, message: "Webhooks created" });

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message });
  }
};

export default clerkwebhooks