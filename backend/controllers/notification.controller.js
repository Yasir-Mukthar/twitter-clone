

import Notification from "../models/notification.model.js";

const getNotifications=async(req,res)=>{
    try {
		const userId = req.user._id
        console.log(userId);

		const notifications = await Notification.find({ to: userId }).populate({
			path: "from",
			select: "username profileImg",
		});
        console.log("notifications all");

		await Notification.updateMany({ to: userId }, { read: true });

		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
}

const deleteNotifications=async(req,res)=>{
    try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
}



export {
    getNotifications,
    deleteNotifications,
}