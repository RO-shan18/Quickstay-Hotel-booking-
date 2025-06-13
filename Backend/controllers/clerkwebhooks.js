import usermodel from "../models/usermodel.js";
import { Webhook } from "svix";

const clerkwebhooks = async (req, res) => {
  try {
    // create svix instance
    const whook = new Webhook(process.env.WEBHOOKS_SIGNING_SECRET); 

    console.log("Saving inside the database")

    // Getting headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    console.log("headers")

    //verifying headers
    await whook.verify(JSON.stringify(req.body), headers);
    
    console.log(req.body)

    //Getting data from req boy
    const {data, type} = req.body;

    console.log("data: ", data)
    console.log("type: ", type);

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
      recentSearchCities: []
    };

    console.log(type)

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