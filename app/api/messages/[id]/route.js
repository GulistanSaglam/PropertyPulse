import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id

export const PUT = async (request, { params }) => {
    try {
        await connectDB();
        const { id } = params;

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify("User ID is required"), { status: 401 });
        }

        const { userId } = sessionUser();

        const message = await Message.findById(id);
        if (!message) return new Response('Messages not found', { status: 404 })

        //verify ownership
        if (message.recepient.toString() !== userId) {
            return new Response(JSON.stringify("Unauthorized"), { status: 401 });
        }

        //Update message to read/unread depending on current status
        message.read = !message.read;
        await message.save();

        return new Response(JSON.stringify(message), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 404 });
    }
}

// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
    try {
        await connectDB();
        const { id } = params;

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify("User ID is required"), { status: 401 });
        }

        const { userId } = sessionUser();

        const message = await Message.findById(id);
        if (!message) return new Response('Messages not found', { status: 404 })

        //verify ownership
        if (message.recepient.toString() !== userId) {
            return new Response(JSON.stringify("Unauthorized"), { status: 401 });
        }

        await message.deleteOne();

        return new Response('Message deleted', { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 404 });
    }
}