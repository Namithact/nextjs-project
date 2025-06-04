import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request,{ params }){
    const {slug} = await params;
    try{
        const post = await prisma.post.findUnique({
            where:{slug}
        })
        if(!post){
            return new Response(JSON.stringify({message:'Post not found'}), {status:404});
        }
        return new Response(JSON.stringify(post), { status: 200 , headers: {
        'Content-Type': 'application/json',
      },});
    }
    catch(error){
        return new Response(JSON.stringify({message: 'Failed to fetch post'}), { status: 500 });
    }
    }
export async function DELETE(request, { params }) {
  const slug = params.slug;

  try {
    await prisma.post.delete({
      where: { slug: slug },
    });
    return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete post' }), {
      status: 500,
          });
  }
}

