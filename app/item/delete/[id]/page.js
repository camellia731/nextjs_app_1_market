"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";

const DeleteItem = (context) => {
  const params = React.use(context.params);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [email, setEmail] = React.useState("");

  const router = useRouter();
  const loginUserEmail = useAuth();
  useEffect(() => {
    const getSingleItem = async (id) => {
      const response = await fetch(
        `http://localhost:3000/api/item/readsingle/${id}`
      );
      const jsonData = await response.json();
      //console.log(jsonData);
      const singleItem = jsonData.singleItem;

      setTitle(singleItem.title);
      setDescription(singleItem.description);
      setPrice(singleItem.price);
      setImage(singleItem.image);
      setEmail(singleItem.email);
    };
    getSingleItem(params.id);
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const item = { title, description, price, image, email };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: loginUserEmail,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch (error) {
      alert("アイテム削除失敗");
      console.error(error);
    }
  };
  if (loginUserEmail === email) {
    return (
      <div>
        <h1>アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="アイテム名"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            value={price}
            type="text"
            name="price"
            placeholder="価格"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            value={image}
            type="text"
            name="image"
            placeholder="画像URL"
            onChange={(e) => setImage(e.target.value)}
            required
          ></input>
          <textarea
            value={description}
            name="description"
            rows={15}
            placeholder="説明"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button>アイテム削除</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="page-title">アイテム削除</h1>
        <h2>アイテム削除権限がありません</h2>
      </div>
    );
  }
};

export default DeleteItem;
