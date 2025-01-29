"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/utils/useAuth";

const CreateItem = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");

  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const item = { title, description, price, image, email };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          price: price,
          image: image,
          email: loginUserEmail,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch (error) {
      alert("アイテム作成失敗");
      console.error(error);
    }
  };

  if (loginUserEmail) {
    return (
      <div >
        <h1 className="page-title">Create Item</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="アイテム名"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="価格"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="画像URL"
            onChange={(e) => setImage(e.target.value)}
            required
          ></input>
          <textarea
            name="description"
            rows={15}
            placeholder="説明"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button>アイテム作成</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
