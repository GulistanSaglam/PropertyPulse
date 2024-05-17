import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// PUT /api/messages/unreadNumber

export const PUT = async (request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify("User ID is required"), { status: 401 });
        }

        const { userId } = sessionUser();

        const unreadMessageNumber = await Message.countDocuments({
            recipient: userId, read: false
        })

        return new Response(JSON.stringify(unreadMessageNumber), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 404 });
    }
}
