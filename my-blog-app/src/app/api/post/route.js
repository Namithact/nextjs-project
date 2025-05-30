import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
    try{
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
        
        return new Response(JSON.stringify(posts), {status:200});
    }
    catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), { status: 500 });
    }
}
export async function POST(request) {
    try{
        const{title,content,slug}  = await request.json(request);
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                slug,
            },
        });
        return new Response(JSON.stringify(newPost), {status:201});
    }
    catch(error){
        return new Response(JSON.stringify({ error: 'Failed to create post' }), { status: 500 });
    }
}