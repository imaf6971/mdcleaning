import Input from "@/ui/Input";
import Navbar from "@/ui/Navbar";
import SectionHeading from "@/ui/SectionHeading";
import Spinner from "@/ui/Spinner";
import SubmitInput from "@/ui/SubmitInput";
import TextArea from "@/ui/TextArea";
import { trpc } from "@/utils/trpc";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function RoomReviewPage() {
  const addReview = trpc.rooms.addReview.useMutation();
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  function handleReviewFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const roomId = parseInt(id as string);
    addReview.mutate({ roomId, name, text });
  }

  return (
    <>
      <Head>
        <title>Оставить отзыв</title>
      </Head>
      <div className="container mx-auto">
        <SectionHeading heading="Оставить отзыв" />
        <main className="m-4 flex flex-col justify-center gap-2 md:mx-auto md:w-2/3">
          {addReview.isSuccess && (
            <div>
              <div>Спасибо за отзыв!</div>
              <div>Страницу можно закрыть :)</div>
            </div>
          )}
          {addReview.isLoading && (
            <div className="flex h-screen justify-center">
              <Spinner />
            </div>
          )}
          {addReview.isIdle && (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleReviewFormSubmit}
            >
              <Input
                minLength={3}
                id="reviewName"
                label="Ваше имя:"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextArea
                id="reviewText"
                label="Оставьте отзыв о нашей работе:"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <SubmitInput value="Отправить" />
            </form>
          )}
        </main>
      </div>
    </>
  );
}
