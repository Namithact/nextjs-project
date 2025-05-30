

export default async function BlogPage({params}) {
  const { slug } = await params;
  console.log("Blog page params:", slug);
  return (
    <div>Blog page</div>
  )
}
