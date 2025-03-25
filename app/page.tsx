import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>AI Content Generator</h1>
      <p>
        This is an AI content generator. You can use it to generate text
        content for your website, blog, or social media posts.
      </p>
      {/* <Image src="" alt="AI" width={500} height={300} /> */}
      <Button variant={"destructive"}>hello there</Button>
    </div>
  );
}
