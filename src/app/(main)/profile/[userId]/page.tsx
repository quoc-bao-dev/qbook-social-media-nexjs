import PostsForUser from '@/components/post/PostsForUser';
import UserProfile from './UserProfile';



const Page = () => {

    return (
        <main className="flex-1">

            <UserProfile />
            <div className="mt-5">
                <PostsForUser />
            </div>
        </main>
    );
};

export default Page;
