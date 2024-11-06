import PostEditor from '@/components/post/editor/PostEditor';
import ForYou from '@/components/post/ForYou';
import { Button } from '@/components/ui/button';
import { Rss, UserRoundPlus } from 'lucide-react';
import Image from 'next/image';

const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=6',
];

const Page = async ({ params }: { params: { userId: string } }) => {
    const { userId } = params;
    return (
        <main className="flex-1">
            <div className="h-[348px] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="user profile"
                    className="w-full h-full object-cover rounded-lg"
                    width={1000}
                    height={348}
                />
            </div>
            <div className="mt-8 flex justify-between">
                <div className="flex gap-4">
                    <div className="w-[168px] h-[168px] rounded-full overflow-hidden">
                        <Image
                            src={
                                'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            }
                            alt="user profile"
                            className="w-full h-full object-cover"
                            width={168}
                            height={168}
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-simibold">Quoc Bao</h1>
                        <p className="mt-1 text-accent-foreground">
                            {' '}
                            1,1k followers . 1k following
                        </p>
                        <div className="flex gap-3 mt-4 ml-6">
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className="w-[40px] h-[40px] rounded-full overflow-hidden -ml-6 p-1 bg-muted"
                                >
                                    <Image
                                        src={avatar}
                                        alt="user profile"
                                        className="w-full h-full object-cover rounded-full"
                                        width={48}
                                        height={48}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>

                </div>


                <div className=" flex gap-3">
                    <Button className="w-full"><UserRoundPlus /> Follow</Button>
                    <Button className="w-full"><Rss /> Follow</Button>
                </div>
            </div>

            <div className="mt-4">
                <p className="mt-8 font-medium text-muted-foreground">
                    Quoc Bao is a passionate developer who loves creating user-friendly web applications. With a keen eye for design and a drive to innovate, he continually explores new technologies to enhance user experiences. When not coding, Quoc Bao enjoys photography and sharing his adventures with his extensive network of followers.
                </p>
            </div>

            <div className="mt-5">
                <PostEditor />
            </div>
            <div className="mt-5">
                <ForYou />
            </div>
        </main>
    );
};

export default Page;
