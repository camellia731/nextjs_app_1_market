import { get } from "mongoose";
import Image from "next/image";
import Link from "next/link";

// 非同期関数を宣言
const getAllItems = async () => {
  // APIエンドポイントからデータ取得用のレスポンスを取得
  const response = await fetch("http://localhost:3000/api/item/readall");
  // レスポンスからJSON形式のデータを解析
  const jsonData = await response.json();
  // 取得したデータを返す
  const allItems = jsonData.allItems;
  return allItems;
};

const ReadAllItems = async () => {
  const allItems = await getAllItems();
  
  return (
    <div className="grid-cionttainer-in">
      {allItems.map(item => 
        <Link href = {`/item/readsingle/${item._id}`} key={item._id}>
          <Image 
            src={item.image} 
            alt="item image"
            width={750}
            height={500}
            priority
          />
          <h2>{item.name}</h2>
          <p>{item.price}</p>
          <p>{item.description.substring(0,80)}...</p>
        </Link>
      )}
    </div>
  );
};

export default ReadAllItems;
