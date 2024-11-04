import PostEditor from "@/components/post/editor/PostEditor";
import ForYou from "@/components/post/ForYou";
import Story from "@/components/story/Story";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Story />
        <ForYou />
      </div>
    </main>
  );
}
