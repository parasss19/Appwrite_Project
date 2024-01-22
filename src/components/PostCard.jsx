import service from '../appwrite/appwriteConfig'
import { Link } from 'react-router-dom'

function PostCard({$id, $createdAt, title, featuredImage}) {

  const date = new Date($createdAt);
  const formatedDate = date.toString();

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-[200px] h-[200px] overflow-hidden bg-gray-100 rounded-md p-1 hover:shadow-xl hover:-translate-y-1 duration-200'>
        
        <div className='h-[70%]  overflow-hidden mb-2'>
          <img 
              src= {service.getFilePreview(featuredImage)}
              alt= {title} 
              className='rounder-md w-full h-full object-cover'
          />
        </div>

        <h2 className='text-md px-2 font-semibold text-slate-600 truncate'> {title} </h2>

        <code className="text-xs text-gray-400">Posted On : {formatedDate}</code>

      </div>
    </Link>
  )
}

export default PostCard
