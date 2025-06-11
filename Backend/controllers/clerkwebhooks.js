import usermodel from "../models/usermodel.js";
import { Webhook } from "svix";

const clerkwebhooks = async (req, res) => {
  try {
    // create svix instance
    const whook = new Webhook(process.env.WEBHOOKS_SIGNING_SECRET);

    // Getting headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamps": req.headers["svix-timestamps"],
      "svix-signature": req.headers["svix-signature"],
    };

    //verifying headers
    await whook.verify(JSON.stringify(req.body), headers);

    //Getting data from req boy
    const { data, type } = req.body;

    const userData = {
      _id: data._id,
      email: data.email_addresses[0].email_address,
      name: data.firstname + " " + data.lastname,
      image: data.image_url,
    };

    //switch case for different events
    switch (type) {
      case "user.created": {
        await usermodel.create(userData);
        break;
      }

      case "user.updated": {
        await usermodel.findByIdAndUpdate(data._id, userData);
        break;
      }

      case "user.created": {
        await usermodel.findByIdAndDelete(data._id);
        break;
      }

      default:
        break;
    }
    res.json({ success: true, message: "Webhooks created" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default clerkwebhooks
